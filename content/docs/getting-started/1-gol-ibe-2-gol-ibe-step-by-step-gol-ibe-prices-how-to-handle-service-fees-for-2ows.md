# How to handle service fees for 2OWs?

<!-- tags: 2OW, two one-way, service fee, OW, pricing, double fee -->

A **2OW** (two one-way) booking consists of two separate one-way tickets sold together instead of a single return ticket. Service fee rules behave differently for 2OWs — this guide explains how to configure them correctly.

## The issue with 2OWs

By default, a service fee set to **per ticket** will be charged twice for a 2OW booking (once for each one-way ticket), which may result in double-charging compared to a standard return ticket.

## How to set up fees correctly for 2OWs

1. Log into the GOL IBE admin console.
2. Go to **Prices → Service fees**.
3. Edit an existing fee or click **Add service fee**.
4. In the **Type** field, look for the option:
   - **OW** — applies to one-way tickets
   - **RT** — applies to return tickets
   - **OW+RT** — applies to both
5. To avoid double-charging 2OWs, create a separate fee rule for **OW** type with half the return fee amount.
6. Set the **RT** rule for standard returns.
7. Save both rules.

## Example

| Ticket type | Fee rule | Amount |
|-------------|----------|--------|
| Return (RT) | Type: RT | €10 |
| Each leg of 2OW | Type: OW | €5 |

This way the total fee for a 2OW (€5 + €5 = €10) matches the fee for a return ticket.

> ⚠️ Always test your fee configuration using a real search before going live.

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
