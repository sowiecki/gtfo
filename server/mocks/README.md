# Mock Reservations
```bash
npm run dev-mocks # Run development mode with mock reservation data
npm run hot-mocks # Run development mode with hot-reloading and mock reservation data
```

For testing purposes, mock data can be dynamically generated to simulate meeting reservations.

Mock reservations for the current day are automatically generated for each device present in `devices.json`. Simulated meeting reservations start at 9:00AM local time, with randomized gaps of 30 minutes (uncommon) to 90 minutes (rare) between different reservations.

`mock-data.json` is only regenerated if the file is deleted or if the mock meeting reservations' start- and end-times no longer take place on the current day.
