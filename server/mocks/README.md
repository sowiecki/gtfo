# Mock Reservations
```bash
npm run dev-mocks # Development mode with mock reservation data
npm run hot-mocks # Development mode with hot-reloading and mock reservation data
```

Mock data is generated and saved into a JSON file to enable persistent data while testing. Before starting the server, `mock-data.json` is tested to be current. If it is from a previous day, it is overwritten with new data; otherwise it is read and used to mock the server making fetches for reservation data.
