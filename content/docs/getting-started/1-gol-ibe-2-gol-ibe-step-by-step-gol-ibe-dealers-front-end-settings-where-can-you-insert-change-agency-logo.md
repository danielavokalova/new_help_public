# Where can you insert / change the agency logo on your GOL IBE front-end?

<!-- tags: logo, agency logo, branding, front-end, image, header -->

Your agency logo appears in the header of the GOL IBE booking engine front-end and in email notifications sent to customers. You can set and update it in two places.

## Option 1: Via Front-end settings (recommended)

1. Log into the GOL IBE admin console.
2. Go to **Dealers → Dealers** → your dealer → **Front-end settings**.
3. Find the field **Logo URL**.
4. Enter the full URL of your logo image (must be publicly accessible, e.g. `https://youragency.com/logo.png`).
5. Click **Save**.
6. Go to **Code Lists → Flush HTML Caches**.

## Option 2: Via Agency detail (for email logo)

1. Go to **Agency → Agency detail**.
2. Find the field **Logo URL**.
3. Enter the URL of your logo.
4. Click **Save**.

> The logo in Agency detail is used primarily in **email notifications**. The logo in Front-end settings appears on the **booking engine website**.

## Logo image requirements

| Property | Recommended value |
|----------|------------------|
| Format | PNG (with transparent background) or SVG |
| Width | 200–400 px |
| Height | 50–100 px |
| File size | Under 100 KB |
| Background | Transparent (for best appearance on any background colour) |

## Tips

- Host the logo on a stable, publicly accessible URL — if the file moves, the logo disappears on the front-end
- After changing the logo URL, flush HTML caches so customers see the new logo immediately
- Test the logo on both desktop and mobile — it may be scaled differently on small screens

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
