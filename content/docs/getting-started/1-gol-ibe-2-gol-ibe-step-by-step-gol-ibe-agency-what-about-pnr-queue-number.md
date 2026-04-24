# What about PNR queue number in GOL IBE?

<!-- tags: PNR, queue, GDS, queue number, booking, ticketing -->

A **queue number** tells the GDS where to place newly created PNRs (Passenger Name Records). Correctly setting the queue ensures that bookings land in the right work queue for your agents to action.

## What is a GDS queue?

In GDS systems (Galileo, Amadeus, Sabre), a queue is a numbered inbox where PNRs are deposited automatically. Agents open the queue in the GDS terminal to work through bookings — issue tickets, add remarks, follow up on payment, etc.

## How to set the queue number in GOL IBE

1. Log into the GOL IBE admin console.
2. Go to **Agency → Agency detail**.
3. Find the field **Queue number**.
4. Enter your GDS queue number (e.g. `14` or `Q14C1`).
5. Click **Save**.

## Queue format by GDS

| GDS | Typical format | Example |
|-----|---------------|---------|
| Galileo (Travelport) | Queue number only | `14` |
| Amadeus | Queue/Category | `70/0` |
| Sabre | Queue number | `100` |

Contact your GDS helpdesk if you are unsure of your queue format.

## Tips

- If the queue number is left blank, PNRs may not be queued automatically — agents would have to find them by PNR locator
- Use a **dedicated queue** for GOL IBE bookings so they are easy to separate from GDS-direct bookings
- After changing the queue number, test with a booking to confirm PNRs are landing in the correct queue
- For Amadeus, you may also need to configure the queue in your Amadeus office profile

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
