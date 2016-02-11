[![Build Status](https://travis-ci.org/Nase00/gtfo.svg?branch=master)](https://travis-ci.org/Nase00/gtfo)

## Gently Tell Folks Out (of meeting rooms)
Push reservation status notifications to meeting rooms! And do other things...

## Getting Started
This program is designed to be run in conjuction with [ems-wrapper](https://github.com/rishirajsingh90/ems-wrapper) on the same machine, **except in production mode**. In production mode, it assumed `ems-wrapper` is deployed on another domain, which is then used to fetch Exchange Services data.
```bash
git clone https://github.com/Nase00/gtfo-nexus.git
cd gtfo-nexus
node gtfo.js
npm run hot-mocks
```
This will start the application in development mode with [mock data](./server/mocks/README.md) and [hot-reloading](https://github.com/gaearon/react-transform-boilerplate).

#### Other commands
```bash
npm run hot # Development mode with live data and hot-reloading
```
```bash
npm run dev-mocks # Development mode with mock data
```
```bash
npm run dev-mocks-dd # Development mode with mock data and disabled devices (experimental)
```
```bash
npm run dev # Development mode with live data
```
```bash
npm run prod # Production mode with live data
```

## Action Items
- Node process automatically restarts on board errors, but we should still probably have some bash automation.
- Moving EWS API to Slalom AWS instance and authenticating without using a real person's account
- Improve hardware
  - Better lighting, nicer cases
- Configuring Raspi to host and run program on Hackathon access point
- Place a demo unit on 53

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
| Parameter        | Description                | Required? |
|------------------|----------------------------|-----------|
| id               | ID of exchange account     | Yes       |
| name             | Display name for room      | Yes       |
| deviceId         | ID of Photon board         | Yes       |
| deviceAuthToken  | Auth token of Photon board | Yes       |
| deviceAlias      | Name of module             | No        |

Example of a `devices.json` with a single device configured to The Loop:
```json
{
  "devices": [
    {
      "id": "the loop",
      "name": "The Loop",
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

Example of a `environment/room-coordinates.json` file configured to display Bronzeville:
```json
{
  "bronzeville": {
    "height": 3.1,
    "width": 5.6,
    "x": 55,
    "y": 40.2
  }
}
```
