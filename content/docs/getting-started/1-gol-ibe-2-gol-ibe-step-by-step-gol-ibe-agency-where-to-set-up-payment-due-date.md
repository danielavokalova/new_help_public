# Where to set up payment due date for bookings

<!-- tags: payment due date, payment deadline, booking, expiry, front-end -->

The **payment due date** determines how long a customer has to complete payment after making a booking on your GOL IBE front-end. Unpaid bookings can be automatically cancelled after this period.

## How to set the payment due date

1. Log into the GOL IBE admin console.
2. Go to **Agency → Agency detail**.
3. Find the field **Payment due (hours)**.
4. Enter the number of hours the customer has to pay (e.g. `24` for 24 hours).
5. Click **Save**.

## How it works

- The countdown starts when the booking is created on the front-end.
- If the customer does not pay within the set period, the booking status changes to **Expired**.
- Expired bookings can be cancelled automatically if auto-cancel is configured.

## Working hours interaction

If your agency has restricted working hours, you can configure the system to count payment time only during open hours:

| Setting | Effect |
|---------|--------|
| Count all hours | Clock runs 24/7 from booking creation |
| Count working hours only | Clock pauses outside working hours |

Contact CEE Systems support to change the working-hours interaction mode.

## Tips

- Set a realistic deadline — too short may frustrate customers who need to arrange payment
- Airlines impose their own ticketing deadlines (Last Ticketing Day); set your payment due date well before that
- Send a payment reminder notification a few hours before expiry (configure in **Notifications → Notification templates**)

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
