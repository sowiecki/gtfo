# Configurable appliction data

It is essential that specific environment files be created and configured correctly to run this application for a particular office.

These files should remain gitignored to prevent private information from being made available on a public repository. Detailed information about the inside of your office can be used in social engineering attacks!

### devices.json
Room device properties.

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

### coordinates.json
To integrate a meeting room into the client map, the room must have an associated [SVG shape](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes) configured and placed into `coordinates.json`.

Example of an `environment/coordinates.json` file configured to display Duna:
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
Mock room reservation data, indentical in format to a response from Exchange services. **Automatically generated**.

### Assets
In addition to these files, remember to save map backdrops to `client/assets` with correct, slugified location names.
