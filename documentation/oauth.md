# OAuth

Currently, only Microsoft Graph API Oauth is supported.

Use of the application can be restricted to authorized users by setting an `oauth` property on [`environment/config.json`](./environment.md).

Example:

```json
{
  "config": {
    "oauth": {
      "authorizeUri": "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize",
      "tokenUri": "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token",
      "clientId": "...",
      "clientSecret": "...",
      "organizationId": "..." // Retrieve from https://graph.microsoft.com/v1.0/organization using a valid token
    }
  }
```
