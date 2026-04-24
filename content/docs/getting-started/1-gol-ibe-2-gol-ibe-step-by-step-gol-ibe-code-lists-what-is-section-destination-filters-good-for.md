# What is section Destination Filters good for?

<!-- tags: destination filter, country, airport, restrict, block, whitelist, blacklist -->

**Destination Filters** let you control which destinations are available — or unavailable — on your booking engine front-end.

## Use cases

- **Restrict to specific markets** — e.g. show only flights within Europe
- **Block certain countries** — e.g. exclude destinations with travel advisories
- **Focus your offering** — simplify the search form by limiting irrelevant destinations
- **Compliance** — prevent bookings to sanctioned or restricted destinations

## How it works

You can create filter rules based on:
- **Country** — allow or block all airports in a country
- **IATA airport code** — allow or block a specific airport
- **Region** — allow or block a geographic region

Rules can be set as:
- **Whitelist** — only show listed destinations
- **Blacklist** — hide listed destinations, show everything else

## How to access

1. Log into the GOL IBE admin console.
2. Go to **Code Lists → Destination Filters**.
3. Click **Add filter** to create a new rule.
4. Choose the filter type (country / airport / region) and enter the value.
5. Set as **Allow** (whitelist) or **Block** (blacklist).
6. Save changes.

> ℹ️ Changes to destination filters take effect after flushing the search cache.

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
