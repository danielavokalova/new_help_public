# How to set up service fee?

1. Log into the GOL IBE admin console.
2. Go to the section **Prices** → **Service fees - agency** or **Service fee - dealers** (depending on your role).
3. The default fee is shown there.

From this screen you can:

- Add a new service fee.
- Modify an already existing service fee.

## How to add a new service fee

1. Click **Add service fee.**

   ![](/images/docs/391a2eecbc5a7232.png)

2. Specify the criteria for your service fee rule.

**GENERAL**

- **Carrier** — if you would like to create a rule for a specific carrier, choose it from the list.
- **Connector** — Air Ticket Galileo = GDS content.

**VALIDITY**

- **Customer validity:**
  - a) Generally valid — valid for all customers.
  - b) Valid for chosen one — click **Choose** and select a client from your Customer database.

- **Origin:**
  - a) Without restrictions — no restrictions on destination.
  - b) IATA code — IATA code of the destination.
  - c) Destination type — choose from the options the system offers.
  - d) Country — to specify the country of origin.

- **Destination** — choose from the options the system offers.
- **Type** — choose whether the rule applies to OW (One Way), RT (Return), or OW+RT (Both).

**CABIN CLASS**

- **Contains** — choose from the different options the system offers.

**FEE**

- **Assigned fee value:**
  - a) Fixed fee — specify the fee as a fixed amount in your currency.
  - b) Fixed fee regards to ticket price — specify a fixed amount and the ticket price level or range for which the fee applies.
  - c) Fixed fee + % fee — combination of a fixed amount and a percentage.
  - d) Fixed + % fee, regards to ticket price — combination of fixed amount and percentage, with specified price limits.

- **Fixed fee** — enter the value of your fee.
- **Fee in % height** — enter the value as a percentage.
- **Customer discount in %** — specify a discount in percent.

**SERVICE FEE FOR INFANT**

- **Service fee for infant in % from common service fee** — specify the fee for infants.
- **Rounded** — fee rounding.

3. Save changes.

## What is the default service fee for?

- It is set up by the system automatically in each GOL IBE account.
- There are no restrictions — those will be applied by you.
- The default fee is applied to all clients without any exception.

## How to modify the default service fee?

1. Click **EDIT.**
2. To set the type and amount of the fee, go to the section **FEE.**
3. Once specified, save changes.
