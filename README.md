[![Build Status](https://travis-ci.org/Nase00/gtfo.svg?branch=master)](https://travis-ci.org/Nase00/gtfo)

## Gently Tell Folks Out (of meeting rooms)
Push reservation status notifications to meeting rooms! And do other things...

## Getting Started
```bash
git clone https://github.com/Nase00/gtfo-nexus.git
cd gtfo-nexus
node gtfo.js
npm run hot -- --mocks
```
This will start the application in development mode with [mock data](./server/mocks/README.md) and [hot-reloading](https://github.com/gaearon/react-transform-boilerplate).

To develop with live data, set up and run [ems-wrapper](https://github.com/rishirajsingh90/ems-wrapper) on the same local machine.

In production mode, it assumed `ems-wrapper` is deployed on another domain, defined in `/server/constants/urls.js`.

##### Options
```bash
--mocks # Disables Outlook api in favor of using mock reservation data

--dd # Disabled devices, useful for testing client without hardware
```
##### Production
```bash
npm run prod # Production mode with live data (ems-wrapper must be deployed)
```

##### Disabling hot reloading
```bash
npm run dev # But why would you want to?
```

## Configuration

- Raspberry Pi 2 Model B v1.1 running JESSIE (other models and distros likely work, but are untested)
- *n* number of [Particle Photons](https://store.particle.io)

## Setup

#### Photon Boards
First, wire a common cathode RGB LED to each Photon board.

###### RGB pin configuration
| Wire   | Pin   |
|:------:|:-----:|
| R      | D0    |
| G      | D1    |
| B      | D2    |
| Ground | Ground|

After setting up each device to [Particle's cloud service](https://docs.particle.io/guide/getting-started/start/photon/), load the [VoodooSpark firmware](https://github.com/voodootikigod/voodoospark) onto each board.

Finally, retrieve the access tokens and device id for each Photon, and place them into `environment/devices.json`.

###### `devices.json` configuration
| Parameter        | Description                           | Required? |
|------------------|---------------------------------------|-----------|
| id               | ID of exchange account<sup>1</sup>    | Yes       |
| name             | Display name for room<sup>2</sup>     | Yes       |
| location         | Floor or location of room <sup>2, 3</sup>| Yes       |
| deviceId         | ID of Photon board                    | Yes       |
| deviceAuthToken  | Auth token of Photon board            | Yes       |
| deviceAlias      | Name of module                        | No        |
<sup>1</sup> Formatted exactly as displayed on Exchange Services.

<sup>2</sup> Proper format, including any spaces or capitlization, intended for display. E.g., `The Loop` rather than `TheLoop` or `The_Loop`.

<sup>3</sup> Make sure that all rooms in the same location have **exactly** matching locations properties. Location tabs are displayed in order of first device entry in the file, e.g. if the first device has the location `Sears Tower 251` it will be the first tab rendered.

Example of a `devices.json` with a single device configured to The Loop:
```json
{
  "devices": [
    {
      "id": "the loop",
      "name": "The Loop",
      "location": "Sears Tower 251",
      "deviceAlias": "Skynet",
      "deviceId": "123456789abcd",
      "deviceAuthToken": "abc123"
    }
  ]
}
```

#### Raspberry Pi
1. Load Debian JESSIE variant onto Raspiberry Pi.
2. Configure SSH and other desired settings.
3. Clone this program onto the Raspberry Pi.
4. Create and configure a `devices.json` file in the root directory.
5. `npm run hot`. (prod under development)

### Client map
To integrate a meeting room into the client map, the room must have an associated [SVG shape](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes) configured and placed into `coordinates.json`.

Example of an `environment/room-coordinates.json` file configured to display Duna:
```json
{
  "duna": {
    "height": 3.1,
    "width": 5.6,
    "x": 55,
    "y": 40.2
  }
}
```

### Ping API
*Alexa, where is Kerbin?*

*Kerbin is on the east side of the office. I've highlighted it on map for you.*

The Ping API allows services to "ping" specific rooms. Pings must be directed to specific clients that are "anchored" to a particular id. The id used is completely arbitrary, but must be matched between the service making the ping and the client attempting to be pinged.

To "anchor" a client, simply add an `anchor` query paramter to its route. E.g., `http://hostname:3000/two-prudential?anchor=east-lobby` defines the client's anchor as `east-lobby`.

To ping this client, direct a POST request to `http://hostname:3000/api/ping` with the headers:

```
{
  id: wrigleyville,
  anchor: east-lobby
}
```
The result of this ping is that Wrigleyville lights up on the client anchored to the east lobby. An example use of this is anchoring a client on the east lobby piTV, and assigning the nearby Amazon Echo to highlight queried rooms on the TV.
