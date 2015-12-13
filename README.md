[![Build Status](https://travis-ci.org/Nase00/gtfo.svg?branch=master)](https://travis-ci.org/Nase00/gtfo)

## Gently Tell Folks Out (of meeting rooms)
Must be running [ems-wrapper](https://github.com/rishirajsingh90/ems-wrapper) on same machine.
```bash
git clone https://github.com/Nase00/gtfo-nexus.git
cd gtfo-nexus
node gtfo.js
npm run hot # Start webserver in development mode
```

## Action Items
- Some method of recovering from a broken process and auto-reconnecting Photons
  - Node.js cluster workers, bash script, or some other method
- Moving EWS API to Slalom AWS instance and authenticating without using a real person's account
- Improve hardware
  - Better lighting, nicer cases
- Configuring Raspi to host and run program on Hackathon access point
- Place a demo unit on 53

## Configuration

*Note: This configuration is still a work-in-progress and subject to change*

Hardware:
- Raspberry Pi 2 Model B v1.1 running JESSIE (other models and distros likely work, but are untested)
- *n* number of [Particle Photons](https://store.particle.io)

## Hardware Setup

#### Photon Boards
1. Setup each device to Particle's cloud service.
2. Load the [VoodooSpark firmware](https://github.com/voodootikigod/voodoospark) onto each board.
3. Load the access tokens and device id for each Photon into `devices.json`.

#### Raspberry Pi
1. Load Debian JESSIE variant onto Raspiberry Pi.
2. Configure SSH and other desired settings.
