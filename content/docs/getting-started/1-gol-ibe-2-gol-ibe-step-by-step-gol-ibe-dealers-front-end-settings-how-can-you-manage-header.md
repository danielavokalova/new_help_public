# How can you manage the header on your GOL IBE web?

<!-- tags: header, navigation, menu, front-end, branding, dealer, HTML -->

The **header** is the top bar of your GOL IBE booking engine front-end. It typically contains your logo, navigation links, and possibly a language or currency switcher. You can customise its content using Supporting Texts and CSS.

## What you can change in the header

| Element | How to change |
|---------|--------------|
| Logo | **Dealers → Front-end settings → Logo URL** |
| Logo link (clicks to your website) | **Dealers → Front-end settings → Logo link URL** |
| Navigation links / menu | **Supporting texts → Supporting texts** → header/menu type |
| Header background colour | **Supporting texts → CSS** — target `.navbar` or `.header` |
| Phone / contact in header | **Supporting texts → Supporting texts** → header contact type |

## How to add navigation links to the header

1. Log into the GOL IBE admin console.
2. Go to **Supporting texts → Supporting texts**.
3. Click **Add text**.
4. Set **Text type** to `Menu` (or `Navigation` / `Header menu`).
5. In the **Body** field, add your HTML navigation:

```html
<nav>
  <a href="https://youragency.com/about">About us</a>
  <a href="https://youragency.com/contact">Contact</a>
  <a href="https://youragency.com/blog">Travel blog</a>
</nav>
```

6. Click **Save** and go to **Code Lists → Flush HTML Caches**.

## How to change the header background colour

1. Go to **Supporting texts → CSS**.
2. Add your CSS overrides:

```css
.navbar, .header {
  background-color: #131f6b;  /* Navy blue */
  color: #ffffff;
}

.navbar a, .header a {
  color: #ffffff;
}
```

3. Click **Save** and flush HTML caches.

## Tips

- Use browser **Developer Tools** (F12) to identify the exact CSS class names used in your header
- Keep the header simple — customers should see the logo and search form immediately
- Test on mobile — mobile headers often collapse into a hamburger menu

> 📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com)
