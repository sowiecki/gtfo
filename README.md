<!-- Build & code status -->
[![GitHub Release](https://img.shields.io/github/release/Nase00/gtfo.svg?style=flat-square)](https://github.com/Nase00/gtfo/releases)
[![Build Status](https://img.shields.io/travis/Nase00/gtfo/master.svg?style=flat-square)](https://travis-ci.org/Nase00/gtfo)
[![Coveralls](https://img.shields.io/coveralls/Nase00/gtfo.svg?style=flat-square)](https://coveralls.io/github/Nase00/gtfo)
[![bitHound](https://img.shields.io/bithound/code/github/Nase00/gtfo.svg?style=flat-square)](https://www.bithound.io/github/Nase00/gtfo/master/files)

<!-- Dependency status -->
[![Known Vulnerabilities](https://snyk.io/test/github/nase00/gtfo/badge.svg?style=flat-square)](https://snyk.io/test/github/nase00/gtfo)
[![Dependencies Status](https://david-dm.org/nase00/gtfo.svg?style=flat-square)](https://david-dm.org/nase00/gtfo)
[![DevDependencies Status](https://david-dm.org/nase00/gtfo/dev-status.svg?style=flat-square)](https://david-dm.org/nase00/gtfo#info=devDependencies)

*This project is still in early development!*

## Gently Tell Folks Out (of meeting rooms)
Push reservation status notifications to meeting rooms! And do other things...

## Getting Started
```bash
git clone https://github.com/Nase00/gtfo.git
cd gtfo
```
[Read how to configure the application to a specific office.](./environment/README.md) The application will not run without these files.
```
# After environment files have been configured
npm run hot -- --mocks
```
This will start the application in development mode with [mock data](./server/mocks/README.md), [hot-reloading](https://github.com/gaearon/react-transform-boilerplate), and [Redux DevTools](https://github.com/gaearon/redux-devtools).

##### DevTools keybindings
 `shift+q` Open/close DevTools dock.
<br/> `shift+w` Change DevTools dock position.
<br/> `shift+e` Change active DevTools monitor.

To develop with live data, set up and run [ems-wrapper](https://github.com/rishirajsingh90/ews-wrapper) on the same local machine. *Note that any service could be used in place of ems-wrapper, so long as the API is identical.*

In production mode, it assumed `ems-wrapper` is deployed on another domain, defined in `/server/constants/urls.js`.

##### Options
```bash
--mocks # Disables Outlook api in favor of using mock reservation data.
--dhc # Disables consoleController's fancy terminal output, sometimes needed for debugging.
--dd # Disables devices, useful for client testing without room module hardware.
```
##### Production build and deploy
```bash
npm install --production # Several dev dependencies do not work on Raspberry Pi distros.
npm run prod # Production mode with live data. ems-wrapper or an equivalent service must be deployed and defined in environment/config.json!
```
##### Development mode without hot reloading
```bash
npm run dev # But why would you want to?
```

##### Tests
```bash
npm run test # Lints and tests client, server, and universal code.
```

## Configuration

- Raspberry Pi 2 Model B v1.1 running JESSIE (any *nix system likely works)
- *n* number of [Particle Photons](https://store.particle.io)

## Setup

#### Photon Boards
Wire a common cathode RGB LED to each Photon board.

###### RGB pin configuration
Hardware: Common cathode RGB LED

| Wire   | Pin   |
|:------:|:-----:|
| R      | A4    |
| G      | A5    |
| B      | A6    |
| Ground | Ground|

After setting up each device to [Particle's cloud service](https://docs.particle.io/guide/getting-started/start/photon/), load the [VoodooSpark firmware](https://github.com/voodootikigod/voodoospark) onto each board.

Retrieve the access tokens and device id for each Photon, and place them into `environment/devices.json`. Read more in [environment configuration](./environment/README.md).

###### Temperature sensor pin configuration (optional)
Hardware: [MCP9808](https://learn.adafruit.com/adafruit-mcp9808-precision-i2c-temperature-sensor-guide/overview)

| Wire   | Pin   |
|:------:|:-----:|
| SDA    | D0    |
| SCL    | D1    |
| Power  | 3v3   |
| Ground | Ground|

###### Motion sensor pin configuration (optional)
Hardware: [HC-SR501](http://www.instructables.com/id/PIR-Motion-Sensor-Tutorial/)

| Wire   | Pin   |
|:------:|:-----:|
| Data   | A0    |
| Power  | 3v3   |
| Ground | Ground|

###### Host
1. `git clone https://github.com/Nase00/gtfo.git && cd gtfo`
2. Create and configure [environment files](./environment/README.md) in the `/environment` directory.
3. `npm install --production && npm run prod`.

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
