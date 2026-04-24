# CSS Customisation of GOL IBE Front-end

<!-- tags: CSS, style, design, customisation, front-end, colours, fonts, layout -->

GOL IBE allows you to customise the visual appearance of your booking engine using custom CSS. This lets you match the look and feel of your agency's brand without changing the underlying functionality.

## How to add custom CSS

1. Log into the GOL IBE admin console.
2. Go to **Supporting texts → CSS**.
3. Enter your custom CSS rules in the editor.
4. Click **Save**.

Changes take effect immediately on the front-end (you may need to flush the HTML cache — see *Flush HTML Caches*).

## What you can customise with CSS

- **Colours** — background, buttons, links, headers
- **Fonts** — font family, size, weight
- **Layout** — spacing, padding, element positioning
- **Logo size and placement**
- **Button styles** — shape, colour, hover effects
- **Form styling** — input fields, dropdowns, checkboxes

## Example: Change the primary button colour

```css
.btn-primary {
  background-color: #e85e20;
  border-color: #e85e20;
}
.btn-primary:hover {
  background-color: #c94d15;
  border-color: #c94d15;
}
```

## Tips

- Use browser developer tools (F12) to inspect element class names before writing CSS
- Always test on a staging/dealer front-end before applying to production
- After saving CSS changes, flush HTML caches to see the updates immediately
- Keep custom CSS minimal — override only what you need

> ⚠️ Avoid overriding core layout CSS — this can break the booking flow.

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
