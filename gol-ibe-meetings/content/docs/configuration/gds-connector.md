# GDS connector setup

A GDS (Global Distribution System) connector lets GOL IBE Meetings search live fares and book flights.

## Supported GDS providers

- Travelport (Galileo / Apollo / Worldspan)
- Amadeus
- Sabre

## Steps

1. Go to **Settings → Connectors** and click **Add connector**.
2. Select your **GDS provider**.
3. Enter the credentials provided by your GDS representative:
   - **PCC / Office ID**
   - **Username**
   - **Password / API key**
4. Click **Test connection**.
5. If the test passes, click **Save**.

## Troubleshooting

If the test fails, verify that:
- The credentials are correct and not expired.
- Your IP address is whitelisted with the GDS provider.
- The PCC has the required permissions for air shopping and booking.

## Related articles

- [Cannot find a flight for the meeting](/portal/troubleshooting/no-flight-found)
