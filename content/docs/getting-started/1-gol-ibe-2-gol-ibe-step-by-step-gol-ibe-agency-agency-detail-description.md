# Agency detail description

<!-- tags: agency, detail, settings, currency, timezone, ticketing, queue, payment -->

The **Agency detail** screen contains the main configuration parameters for your GOL IBE booking engine. You can find it under **Agency → Agency detail**.

## Key fields

| Field | Description |
|-------|-------------|
| **Name** | Your agency's name |
| **Currency** | Default currency for all transactions |
| **Time zone** | Affects working hours and booking timestamps |
| **IATA** | Your agency's IATA number |
| **PCC** | Your Galileo Pseudo City Code |
| **Queue number** | Galileo queue where new PNRs are placed after booking |
| **Due Date** / **Last Ticketing Day** | Default last ticketing date offset |
| **Auto-ticketing** | Enables automatic ticket issuance after payment |
| **Auto-ticketing delay** | Minutes to wait before auto-issuing a ticket |
| **Block Bookings** | Suspends new front-end bookings when enabled |
| **E-mail** | Primary agency contact email |
| **Phone** | Contact phone displayed on the front-end |
| **Address / City / ZIP** | Agency address, used on invoices |
| **VAT number** | VAT registration number, printed on invoices |
| **BCC e-mail** | Receives a copy of every outgoing notification |
| **From name** | Sender name shown in customer email clients |
| **From e-mail** | Reply-to address for all outgoing notifications |
| **Active** | Master switch — when off, the entire booking engine is disabled |

## Notes

- After changing **Currency** or **Time zone**, contact CEE Systems support — these affect database-level calculations.
- **Block Bookings** is useful during maintenance; customers see a message that the service is temporarily unavailable.
- The **From e-mail** setting may require an SPF/DKIM DNS update to avoid notification emails landing in spam.

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
