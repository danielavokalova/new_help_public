# How to modify dates of departure and arrival on my GOL IBE search form

<!-- tags: departure date, arrival date, date range, search form, calendar, dealer edit -->

You can control the **minimum and maximum selectable dates** on the GOL IBE search form calendar. This prevents customers from searching for flights too far in the past or too far in the future.

## How to modify date ranges

1. Log into the GOL IBE admin console.
2. Go to **Dealers → Dealers** and open your dealer record.
3. Click **Edit** (Dealer Edit).
4. Find the date range settings:
   - **Min departure offset (days)** — earliest selectable departure (e.g. `1` = tomorrow)
   - **Max departure offset (days)** — latest selectable departure (e.g. `365` = up to 1 year ahead)
   - **Max trip duration (days)** — maximum number of nights for a return trip
5. Click **Save**.

## Example configurations

| Use case | Min offset | Max offset | Max duration |
|----------|------------|------------|--------------|
| Standard agency | 1 day | 365 days | 30 days |
| Last-minute specialist | 0 days | 30 days | 14 days |
| Long-haul focus | 7 days | 730 days | 60 days |

## Tips

- Setting **Min departure offset** to `0` allows same-day bookings; set to `1` to require at least one day's notice
- If your GDS connector does not return results for dates more than 330 days ahead, set **Max departure offset** accordingly
- Very long **Max trip duration** values can slow down the return date calendar — keep it to a realistic maximum

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
