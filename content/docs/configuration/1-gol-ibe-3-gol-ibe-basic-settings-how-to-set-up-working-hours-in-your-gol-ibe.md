# How to set up working hours in your GOL IBE ?

***

**What is this section about?** 

* This section allows you to set up working hours. 
* This set up  prevents your customers from making bookings that your agents wouldn't be able to e-ticket because they're out of the office (outside of working hours). 
* We highly recommend to use one of the integrated payment gateways and set up the automated e-ticketing. Another option is to set up notifications and check the bookings also outside of your working hours in order to sell as many tickets as possible.

**How to manage this section?** 

1\) Log into admin console.

2\) Go to the section **Agency - Working hours**.

3\) Click **Edit.**

4\) Set up your agency business hours.

5\) Save changes.



![](/images/docs/7beb269ec6dd7cdc.png)



The way example is set up means that agency will handle all bookings from 9:00am - 8pm from Monday till Friday. Every day there is half an hour for lunch. Saturday and Sunday no one handles bookings.

## The logic of setting working hours

* The setting is a protection against a situation when your customer books a ticket at 20:05 because your office closes at 20:00. 
* The booking must be e-ticketed on the same day but there's nobody at your office to do it after 20:00. The same applies to weekends and days off in general. Your working hours are allways compared to the last ticketing date. 
* The last ticketing date displayed to customers is determined based on the fare conditions (this can be limited in the settings). However, thanks to the working hours settings, it is limited to the day when your agency is open so that there's enough time for the e-ticketing.

In order for this feature to function properly, it is also necessary to define for individual payment methods how much time within the working hours is needed to handle a business case. The default setting is 1 hour. This way you can affect which payment methods are offered when the last date of e-ticketing is approaching. If you want this date to match the date of booking (ie. it has to be issued "immediately"), you can set a higher value for the other payment methods and those are not offered at all.

You can encounter three different situations:

1. The customer books a ticket and there's enough time within your working hours to process the booking and to issue the ticket – everything is all right and the booking can be made.
2. The customer books a ticket but the payment methods have different minimum times required to handle bookings. Some can still be used within your working hours, some not. The customer is offered and can select only those that can be used within your working hours.
3. None of the payment methods allows the ticket to be issued within your working hours. In such case, GOL IBE does not allow the booking to be finished (the booking form cannot be completed) and it informs the customer. You can customize this notification in the GOL IBE back office under **Supporting texts**.

## Customization of standard working hours - public holidays etc.

Go to **Agency - Working hours modifications**

Here you can define exceptions to the set working hours, ie. to define public holidays and other days when your agency is closed. At this moment, there's no code list available for public holidays. If you need to define these days, please do so manually.



![](/images/docs/3ffcd51dc609a837.png)



> **If you set only a date** - it means that your agency is closed for the whole day.
> 
> **If you set time ( Since , Till )** - you limit your working hours on that day only to the defined period of time.

***

📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com).
