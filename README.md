<!-- Build & code status -->
[![GitHub Release](https://img.shields.io/github/release/Nase00/gtfo.svg?style=flat-square)](https://github.com/Nase00/gtfo/releases)
[![Build Status](https://img.shields.io/travis/Nase00/gtfo/master.svg?style=flat-square)](https://travis-ci.org/Nase00/gtfo)
[![Coveralls](https://img.shields.io/coveralls/Nase00/gtfo.svg?style=flat-square)](https://coveralls.io/github/Nase00/gtfo)
[![bitHound](https://img.shields.io/bithound/code/github/Nase00/gtfo.svg?style=flat-square)](https://www.bithound.io/github/Nase00/gtfo/master/files)

<!-- Dependency status -->
[![Known Vulnerabilities](https://snyk.io/test/github/Nase00/gtfo/badge.svg?style=flat-square)](https://snyk.io/test/github/Nase00/gtfo)
[![Dependencies Status](https://david-dm.org/nase00/gtfo.svg?style=flat-square)](https://david-dm.org/nase00/gtfo)
[![DevDependencies Status](https://david-dm.org/nase00/gtfo/dev-status.svg?style=flat-square)](https://david-dm.org/nase00/gtfo#info=devDependencies)

# **G**ently **T**ell **F**olks **O**ut (of meeting rooms)
Push reservation notifications to meeting rooms!

Using remote modules equipped with RGB LEDs, GTFO lets meeting room occupants know the status of their current reservation. For example, 5 minutes before a meeting ends and another is set to begin, the room's LED will pulse orange to let occupants know it's time to begin wrapping up.

## Materials
Minimum required hardware:
* [Particle Photon](https://store.particle.io/) (1 per room)
* RGB LED (1 per room)
* A Unix-based server (Raspberry Pi, spare computer running OSX or Linux, etc.)
* A network that includes 802.11b/g/n WiFi hotspots

For the client, you'll need to find or make a map overview of your office layout.

## Hardware Setup

#### Photon Boards
[Connect each board](https://docs.particle.io/guide/getting-started/start/photon/) to your WiFi network, then flash each with the [VoodooSpark firmware](https://github.com/voodootikigod/voodoospark).

Retrieve the access tokens and device ids for each Photon, and place them into `environment/devices.json`. Read more in [environment configuration](./environment/README.md).

Wire a common cathode RGB LED to each Photon board. Optionally, wire a motion and temperature sensor.

###### RGB pin configuration (required)
Hardware: Common cathode RGB LED

| Wire   | Pin   |
|:------:|:-----:|
| R      | A7    |
| G      | A5    |
| B      | A4    |
| Ground | Ground|

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

## Software Setup
```bash
git clone https://github.com/Nase00/gtfo.git && cd gtfo
```
Before the application can be run, [read how to configure it to your specific office](./environment/README.md) or run `npm run demo` to generate an example configuration. The application will not run otherwise.
```
# After environment files have been configured
npm run hot -- --mocks
```
This will start the application in development mode with [mock data](./server/mocks/README.md), [hot-reloading](https://github.com/gaearon/react-transform-boilerplate), and [Redux DevTools](https://github.com/gaearon/redux-devtools). At this point, the application should find and connect to each Particle Photon, and light up the LEDs.

To develop with live data, set up and run [ems-wrapper](https://github.com/rishirajsingh90/ews-wrapper) on the same local machine. *Note that any service could be used in place of ems-wrapper, so long as the API is identical.*

In production mode, it assumed `ems-wrapper` is deployed on another domain, by [environment configuration](./environment/README.md).

##### Production build and deploy
```bash
npm install --production # Several dev dependencies are not Raspberry Pi compatible.
npm run prod # Production mode with live data. ems-wrapper or an equivalent service must be deployed and defined in environment/config.json!
```


### Ping API
*[Alexa](https://developer.amazon.com/public/solutions/alexa), where is Kerbin?*

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

#### Ping troubleshooting
Some internal office networks restrict exposing ports for making HTTP requests. This would make it impossible, for instance, for an Echo lamdba service hosted on AWS to send a ping request to a GTFO server hosted on the office intranet. For these restricted networks, *[Acheron](https://github.com/Nase00/acheron)* was created to be hosted externally (e.g., on a cloud service) to accept and forward pings to GTFO via a WebSocket connection.

To avoid confusion, note that there are two distinct WebSocket services within GTFO. The [socket controller]('./server/controllers/socket') exists to *host* a WebSocket server to which browser applications connect to as *clients*. The [proxy controller]('./server/controllers/proxy') controller exists to connect to the proxy *host* where GTFO itself is considered the sole *client*.

## Development
##### DevTools keybindings
 `shift+q` Open/close DevTools dock.
<br/> `shift+w` Change DevTools dock position.
<br/> `shift+e` Change active DevTools monitor.

##### Tests
```bash
npm run test # Lints and tests client, server, and universal code.
```

##### CLI Options
```bash
--mocks # Disables Outlook api in favor of using mock reservation data.
--dhc # Disables consoleController's fancy terminal output, sometimes needed for debugging.
--dd # Disables devices, useful for client testing without room module hardware.
```
