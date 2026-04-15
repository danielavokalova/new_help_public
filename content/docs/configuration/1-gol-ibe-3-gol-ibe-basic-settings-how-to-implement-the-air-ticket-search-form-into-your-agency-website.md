# How to implement the air ticket search form into your agency website?

***

You can insert a search form into your web pages and the search will thus become part of your pages. That's all you have to do. Once the client enters where he wants to fly and confirms, he will see the offers on a new page. 



![](/images/docs/b55f951a17a289d2.png)



You can implement the air ticket search form two ways. Via implementing: 

1. [html package](#1.-html-package) 

  2\.  [iframe ](#2.-iframe)

Below you find find step by step instructions.

**1. html package**

The big advantage of this solution is that you can fully integrate the form with the page and customize it. The implementation can be more demanding, the form contains styles and scripts that can interact with your page and any conflicts must be resolved for everything to work properly.

1\) Log into the GOL IBE admin console

![](/images/docs/777457d78eaffa08.png)

2\) Go to the section **Dealer details** - **Front-End settings****  -** link **Static HTML**** for download**.

![](/images/docs/dcedb7a1607ac3a2.png)

![](/images/docs/b3c13db7c79f99c2.png)

![](/images/docs/dfd52a90069b0776.png)

> The form includes HTML, CSS, pictures and relevant scripts for implementation into your website, including the full functionality of the destination search tooltip. You can customize the form as you wish.

The result may look like e.g. this way: 

![](/images/docs/1d67029a6b6dc861.png)

**2. iframe**

Another option is the iframe which offers an easy implementation, however it does have some disadvantages. For example, if your customers search for an open-jaw flight and they keep adding more and more flights, the form will keep extending and you either need to leave enough space on your website, or allow scrolling. Neither looks very nice.

Here's an example of the implementation.

Just enter the following code into your existing webpage:\
(replace xxxx with the subdomain of your Front-End)

 *`<iframe src=https://xxx.golibe.com/iframe width="100%" height="565px" frameborder="0" allowtransparency=true></iframe>`*

**For geeks: Customize the default settings of the search**

If you want to redirect your customers straight to the search results and let them wait on the waiting page you can use parameters in URL:

```
https://xxxx.golibe.com/results?from=VIE&to=PAR&flightClass=ECO&departureDate=2023-01-20&returnDate=2023-01-30&ADT=1
```

***

📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com).
