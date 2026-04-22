# Wait page — what is it good for?

<!-- tags: wait page, loading page, search results, spinner, front-end, user experience -->

The **wait page** (also called the loading or search page) is displayed to customers while GOL IBE is querying the GDS for available flights. It typically shows a progress indicator and can include promotional content or messages.

## Why it matters

Flight availability searches can take several seconds. A well-designed wait page:

- Keeps customers engaged instead of assuming the site is broken
- Gives you space to display promotional messages, banners, or tips
- Reduces bounce rates during the search process

## How to customise the wait page

1. Log into the GOL IBE admin console.
2. Go to **Supporting texts → Supporting texts**.
3. Find or create a text entry with **Text type** set to `Wait page` (or `Search loading page`).
4. In the **Body** field, add your HTML content — promotions, an animated gif, tips for travellers, etc.
5. Click **Save**.
6. Go to **Code Lists → Flush HTML Caches**.

## Example wait page content (HTML)

```html
<div class="wait-message">
  <h2>Searching for the best fares…</h2>
  <p>This usually takes 5–10 seconds.</p>
  <ul>
    <li>🌍 We search multiple airlines at once</li>
    <li>💶 All prices include taxes and fees</li>
    <li>✅ Instant booking confirmation</li>
  </ul>
</div>
```

## Tips

- Keep the message short and reassuring — customers are waiting
- Avoid heavy images that slow down the page further
- If searches regularly take more than 15 seconds, contact CEE Systems support to review your GDS connector performance

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
