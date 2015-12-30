[![Build Status](https://travis-ci.org/Nase00/gtfo.svg?branch=master)](https://travis-ci.org/Nase00/gtfo)

## Gently Tell Folks Out (of meeting rooms)
Push reservation status notifications to meeting rooms!

## Getting Started
Must be running [ems-wrapper](https://github.com/rishirajsingh90/ems-wrapper) on same machine.
```bash
git clone https://github.com/Nase00/gtfo-nexus.git
cd gtfo-nexus
node gtfo.js
npm run hot-mocks
```
This will start the application in development mode with mock data and [hot-reloading](https://github.com/gaearon/react-transform-boilerplate).

#### Other commands
```bash
npm run hot # Development mode with live data and hot-reloading
```
```bash
npm run dev-mocks # Development mode with mock data
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

Hardware:
- Raspberry Pi 2 Model B v1.1 running JESSIE (other models and distros likely work, but are untested)
- *n* number of [Particle Photons](https://store.particle.io)

## Hardware Setup

#### Photon Boards
1. Setup each device to Particle's cloud service.
2. Load the [VoodooSpark firmware](https://github.com/voodootikigod/voodoospark) onto each board.
3. Load the access tokens and device id for each Photon into `devices.json`.

```js
{
  "devices": [
    // Example of meeting JSON object
    {
      "location": "The Loop", // Actual name of meeting room
      "deviceAlias": "Skynet", // This can be whatever, use it to keep track of your hardware

      // Find device ID and authToken on your Particle account devices page
      // or use https://github.com/voodootikigod/voodoospark#connecting-the-particle-device-to-you
      "deviceId": "2c0021000547343339373536",
      "deviceAuthToken": "abc123",

      "outlookAccount": "chitheloop@slalom.com",
      "outlookAuthToken": "def456", // NOTE still working the kinks out on this, may be omitted in the future

      "type": "Particle Photon"
    },
    ...
  ]
}
```

#### Raspberry Pi
1. Load Debian JESSIE variant onto Raspiberry Pi.
2. Configure SSH and other desired settings.
3. Clone this program onto the Raspberry Pi.
4. Create and configure a `devices.json` file in the root directory.
5. `npm run hot`. (prod under development)

## Mock Data
Mock reservations for the current local date are automatically generated for each device present in `devices.json`. The file is left untouched as long as the reservations are up-to-date, otherwise it is re-generated. I.e., if you have a `mock-data.json` generated from running `npm run hot-mocks` on one day, and then run it againt he next day, `mock-data.json` will be overwritten with new, random reservations.
