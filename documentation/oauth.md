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

# Custom scopes (delegated permissions)

The default [delegated permissions](https://docs.microsoft.com/en-us/graph/permissions-reference) is `User.Read Bookings.ReadWrite.All Calendars.Read.Shared`. To change this, load the app with a `scope` query paramter, separating each permission with a space.

For example, to set the delegated permissions to `User.Read`.

```
localhost:3000?scope=User.Read
```

This method does _not_ append additional scopes, it completely _overrides_ the defaults. It is mostly intended to allow "partial" authentication for running the application on a public, unattended device. **Malicious or mischievous users can still use this gain read access to the following data using any stored tokens**:

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users/$entity",
  "businessPhones": [],
  "displayName": "",
  "givenName": "",
  "jobTitle": "",
  "mail": "",
  "mobilePhone": "",
  "officeLocation": "",
  "preferredLanguage": "",
  "surname": "",
  "userPrincipalName": "",
  "id": ""
}
```

This method of overriding scopes is only recommended for running the app unattended in certain restricted areas, where everyone with physical access may already know your details stored by the organization.
