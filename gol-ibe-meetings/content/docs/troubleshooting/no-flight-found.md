# Cannot find a flight for the meeting

The flight search returns no results or an error.

## Common causes and fixes

**GDS connector not configured or inactive**
: Go to **Settings → Connectors** and verify that at least one connector has a green status. If it shows an error, see [GDS connector setup](/portal/configuration/gds-connector).

**Origin or destination airport code incorrect**
: Check that the IATA codes entered (e.g. PRG for Prague, LHR for London Heathrow) are correct.

**Search dates too far in advance**
: Some GDS systems only return fares within a certain booking window (typically up to 11 months ahead).

**No availability on the requested route**
: Try alternative dates or nearby airports. Use the **Flexible dates** option in the search form.

**Credentials expired**
: The GDS API credentials may have expired. Contact your GDS account manager to renew them and update the connector settings.

## Related articles

- [GDS connector setup](/portal/configuration/gds-connector)
- [Book travel for a meeting](/portal/operations/book-travel)
