# How to create a customer database

<!-- tags: customer database, create customer, registration, profile, front-end -->

You can build a customer database in GOL IBE either by creating profiles manually in the admin console or by enabling customer registration on your front-end.

## Method 1: Enable front-end registration

This allows customers to create their own accounts when booking.

1. Log into the GOL IBE admin console.
2. Go to **Dealers → Dealers** → your dealer → **Front-end settings**.
3. Find the **Customer registration** toggle and enable it.
4. Click **Save** and flush HTML caches.

Customers will now see a **Register** / **Log in** option on your booking engine. After registering, their personal and travel document details are saved for future bookings.

## Method 2: Create customer profile manually

1. Go to **Customers → Customers**.
2. Click **Add customer** (or **New customer**).
3. Fill in:
   - **First name**, **Last name**
   - **Email** address (used as login)
   - **Phone**
   - **Date of birth**
4. Optionally add **travel documents** (passport, ID card).
5. Click **Save**.

## What information is stored

| Field | Notes |
|-------|-------|
| Name | Required |
| Email | Used as login username on front-end |
| Phone | Optional |
| Date of birth | Used for age-based fare rules |
| Nationality | Used for passport/visa logic |
| Travel documents | Passport number, expiry, issuing country |
| Booking history | Automatically linked when customer books |

## Tips

- Customers created manually receive an invitation email with a link to set their password (if email notifications are active)
- You can import customers in bulk — contact CEE Systems support for the CSV import format
- Customer profiles are dealer-specific — a customer registered on Dealer A does not automatically appear on Dealer B

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
