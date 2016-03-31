<!-- Build status -->
[![GitHub Release](https://img.shields.io/github/release/Nase00/gtfo.svg?style=flat-square)](https://github.com/Nase00/gtfo/releases)
[![Build Status](https://img.shields.io/travis/Nase00/gtfo/master.svg?style=flat-square)](https://travis-ci.org/Nase00/gtfo)
[![Coveralls](https://img.shields.io/coveralls/Nase00/gtfo.svg?style=flat-square)]()

<!-- Code quality -->
[![Known Vulnerabilities](https://snyk.io/test/github/nase00/gtfo/badge.svg?style=flat-square)](https://snyk.io/test/github/nase00/gtfo)
[![Dependencies Status](https://david-dm.org/nase00/gtfo.svg?style=flat-square)](https://david-dm.org/nase00/gtfo)
[![DevDependencies Status](https://david-dm.org/nase00/gtfo/dev-status.svg?style=flat-square)](https://david-dm.org/nase00/gtfo#info=devDependencies)
[![bitHound](https://img.shields.io/bithound/code/github/Nase00/gtfo.svg?style=flat-square)]()

*This project is still in early development!*

## Gently Tell Folks Out (of meeting rooms)
Push reservation status notifications to meeting rooms! And do other things...

## Getting Started
```bash
git clone https://github.com/Nase00/gtfo-nexus.git
cd gtfo-nexus
npm run hot -- --mocks
```
This will start the application in development mode with [mock data](./server/mocks/README.md) and [hot-reloading](https://github.com/gaearon/react-transform-boilerplate).

To develop with live data, set up and run [ems-wrapper](https://github.com/rishirajsingh90/ews-wrapper) on the same local machine.

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

##### Tests
```bash
npm run test
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

Finally, retrieve the access tokens and device id for each Photon, and place them into `environment/devices.json`. Read more in [environment configuration](./environment/README.md).

#### Raspberry Pi
1. Load Debian JESSIE variant onto Raspiberry Pi.
2. Configure SSH and other desired settings.
3. Clone this program onto the Raspberry Pi.
4. Create and configure a `devices.json` file in the root directory.
5. `npm run hot`. (prod under development)

### Ping API
*Alexa, where is Kerbin?*

*Kerbin is on the east side of the office. I've highlighted it on map for you.*

The Ping API allows external services to "ping" specific rooms on targetted clients. Clients can be targetted using "anchors." The anchor id used is completely arbitrary, but must be matched between the service making the ping and the client attempting to be pinged.

To "anchor" a client, simply add an `anchor` query paramter to its route. E.g., `http://hostname:3000/sears-tower-251?anchor=east-lobby` defines the client's anchor as `east-lobby`.

To ping this client from an external service, direct a POST request to `http://hostname:3000/api/ping` with the headers:

```
{
  id: kerbin,
  anchor: east-lobby
}
```

The result of this ping is that Kerbin lights up on the client anchored to the east lobby. An example use of this is anchoring a client on a display in the east lobby, and assigning a nearby Amazon Echo to highlight queried rooms on the TV.
