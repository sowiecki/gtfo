# Auth

Unlike the [oauth](./oauth.md) configuration, `auth.headlessAuthorization` can be set to gate GET requests to `/api/reservations`. All GET requests must include an `authorization` header that matches `auth.headlessAuthorization`.

This **must be set** if oauth is enabled.

In the future, this route will also validate oauth tokens.
