# How to implement the air ticket search form into your agency website?

You can insert a search form into your web pages and the search will thus become part of your pages. Once the client enters where they want to fly and confirms, they will see the offers on a new page.

You can implement the air ticket search form two ways:

1. [HTML package](#1-html-package)
2. [iframe](#2-iframe)

Below you will find step-by-step instructions.

**1. HTML package**

The big advantage of this solution is that you can fully integrate the form with the page and customize it. The implementation can be more demanding — the form contains styles and scripts that can interact with your page, and any conflicts must be resolved for everything to work properly.

1. Log into the GOL IBE admin console.
2. Go to the section **Dealer details** → **Front-End settings** → link **Static HTML** for download.

> The form includes HTML, CSS, pictures and relevant scripts for implementation into your website, including the full functionality of the destination search tooltip. You can customize the form as you wish.

**2. iframe**

Another option is the iframe, which offers easy implementation but has some disadvantages. For example, if your customers search for an open-jaw flight and they keep adding more flights, the form will keep extending — you either need to leave enough space on your website or allow scrolling.

Enter the following code into your existing webpage (replace `xxxx` with the subdomain of your Front-End):

*`<iframe src=https://xxx.golibe.com/iframe width="100%" height="565px" frameborder="0" allowtransparency=true></iframe>`*

**For geeks: Customize the default settings of the search**

If you want to redirect your customers straight to the search results, you can use parameters in the URL:

```
https://xxxx.golibe.com/results?from=VIE&to=PAR&flightClass=ECO&departureDate=2023-01-20&returnDate=2023-01-30&ADT=1
```
