# Configurable application data

Out of the box, this application knows nothing about your office layout, hosted external services, or hardware authentication values.
Therefore, specific environment files must be created and configured correctly to run this application for a particular office.

All user-configurated files are (and should remain) gitignored to prevent private information from being made available in a public repository. Detailed information about the inside of your office can be used in social engineering attacks!

## Demo

`npm run demo` will generate a very basic demonstration of generic configuration files, sans backdrop files.

### config.json

General configuration.

| Parameter           | Description                                      | Required? | Default      |
| ------------------- | ------------------------------------------------ | --------- | ------------ |
| id                  | Identifier for pings proxy                       | No        |              |
| public              | Configurations passed to client (insecure!)      | Yes       |              |
| - timezone          | The UTC offset of the physical building location | Yes       |              |
| - title             | Page title to display on client                  | No        | "GTFO"       |
| - enableTemperature | Enables (experimental) temperature readings      | No        |              |
| - enableMotion      | Enables (experimental) motion readings           | No        |              |
| - defaultTempScale  | Must be either "celsius" or "fahrenheit"         | No        | "fahrenheit" |
| - note              | Note to be displayed in sidebar                  | No        |              |
| reservations        | Reservations API properties                      | Yes       |              |
| - host              | Reservations service host                        | Yes       |              |
| - path              | Reservations service API path                    | Yes       |              |
| stalls              | Stalls API properties                            | No        |              |
| - host              | Stalls service host                              | Yes       |              |
| - path              | Stalls service API path                          | Yes       |              |
| proxy               | Proxy API properties                             | No        |              |
| - host              | Proxy service host                               | Yes       |              |

Example of a `config.json`:

```json
{
  "id": "foo",
  "config": {
    "public": {
      "title": "Some Company Name",
      "enableTemperature": true,
      "defaultTempScale": "fahrenheit"
    },
    "reservations": {
      "host": "http://heroku-app.com",
      "path": "/your-hosted-ews-wrapper"
    },
    "stalls": {
      "host": "http://digitalocean.com",
      "path": "/your-hosted-stalls-service"
    },
    "proxy": {
      "host": "ws://digitalocean.com",
      "path": "/your-hosted-proxy-instance"
    }
  }
}
```

### devices.json

Room device properties.

| Parameter       | Description                                           | Required? | Type   |
| --------------- | ----------------------------------------------------- | --------- | ------ |
| id              | ID of exchange account<sup>1</sup>                    | Yes       | String |
| name            | Display name for room<sup>2</sup>                     | Yes       | String |
| location        | Floor or location of room <sup>2, 3</sup>             | Yes       | String |
| deviceId        | ID of Photon board                                    | Yes       | String |
| deviceAuthToken | Auth token of Photon board                            | Yes       | String |
| deviceAlias     | Name of module                                        | No        | String |
| capabilities    | Hardware capabilities of module                       | No        | Object |
| - motion        | Set to true if module has a motion sensor<sup>4</sup> | No        | Bool   |

<sup>1</sup> Formatted exactly as displayed on Exchange Services.

<sup>2</sup> Proper format, including any spaces or capitalization, intended for display. E.g., `The Loop` rather than `TheLoop` or `The_Loop`.

<sup>3</sup> Make sure that all rooms in the same location have **exactly** matching locations properties. Location tabs are displayed in order of first device entry in the file, e.g. if the first device has the location `Sears Tower 251` it will be the first tab rendered.

<sup>4</sup> Takes precedence over and overrides `config.json`'s `enableMotion` property.
Use this to enable motion only on individual modules equipped with motion sensors.

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

### coordinates.json

If you intend to use the office map feature, each room must have an associated [SVG shape](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes) configured
with a size and position in `coordinates.json`.

Example of an `environment/coordinates.json` file configured to display a meeting room nicknamed "Duna":

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

### markers.json

Markers to overlay on maps.

### mock-data.json

Mock room reservation data, indentical in format to a response from Exchange services. Automatically generated with the `--mocks` flag, or automatically regenerated if existing mock reservations are over a day old.

### Office map backgrounds

Each floor/section of an office map should have its own backgrund image.
These background images are layouts for the room tiles to be displayed onto.
Ideally, they may be scanned and copied or traced from actual building blueprints.

Each background must be saved as a `.png` to `client/assets` with slugified (lower-cased and spaces replaced with hyphens) location names matching the location assigned to corresponding devices.
E.g., if devices are assigned to "Sears Tower 108", the background asset should be saved as `environment/assets/sears-tower-108.png`.
