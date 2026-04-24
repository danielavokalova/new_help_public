# Agency detail description

<!-- tags: agency, detail, settings, currency, timezone, ticketing, HAP, block bookings, special offers -->

The **Agency detail** screen contains the main configuration parameters for your GOL IBE booking engine. You can find it under **Agency → Agency detail**.

## Field reference

| # | Field | Description |
|---|-------|-------------|
| 1 | **Name** | Your agency's full legal name, displayed on invoices and emails |
| 2 | **Short name** | Abbreviation used in system reports and logs |
| 3 | **Currency** | Default currency for all transactions on this agency |
| 4 | **Time zone** | Server time zone — affects working hours and booking timestamps |
| 5 | **Country** | Country of registration; used for VAT and compliance rules |
| 6 | **IATA** | Your agency's IATA number |
| 7 | **PCC / Office ID** | GDS office identifier (Galileo, Sabre, Amadeus) |
| 8 | **Last Ticketing Day** | Default last ticketing day offset (in days from booking date) |
| 9 | **HAP** | Handling/administrative processing flag — enables HAP fee logic |
| 10 | **Block Bookings** | Suspends new front-end bookings when toggled on |
| 11 | **Special Offers** | Enables the Special Offers section on your front-end |
| 12 | **Payment due (hours)** | Hours after booking when payment must be completed |
| 13 | **Auto-ticketing** | Enables automatic ticket issuance after payment |
| 14 | **Auto-ticketing delay** | Minutes to wait before auto-issuing a ticket |
| 15 | **Queue number** | GDS queue where new PNRs are placed |
| 16 | **E-mail** | Primary contact email for the agency |
| 17 | **Phone** | Contact phone displayed on the front-end |
| 18 | **Address** | Street address, used on invoices |
| 19 | **City** | City, used on invoices |
| 20 | **ZIP** | Postal code |
| 21 | **VAT number** | VAT registration number, printed on invoices |
| 22 | **Invoice prefix** | Prefix added to invoice numbers (e.g. `INV-`) |
| 23 | **Invoice counter** | Starting number for the next invoice |
| 24 | **BCC e-mail** | Every outgoing email is also sent to this address |
| 25 | **From name** | Sender name shown in customer email clients |
| 26 | **From e-mail** | Reply-to address for all outgoing notifications |
| 27 | **Logo URL** | URL of your agency logo displayed in emails |
| 28 | **Active** | Master switch — when off, the entire booking engine is disabled |

## Tips

- After changing **Currency** or **Time zone**, contact CEE Systems support — these fields affect database-level calculations
- **Block Bookings** is useful for maintenance windows; customers see a "temporarily unavailable" message
- The **Payment due** field works together with working hours — the clock counts only during open hours if that option is enabled
- Changes to **From e-mail** may require SPF/DKIM update to avoid spam filtering

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
