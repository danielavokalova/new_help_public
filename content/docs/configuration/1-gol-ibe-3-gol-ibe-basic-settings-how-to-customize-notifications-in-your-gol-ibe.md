# How to customize notifications in your GOL IBE ?

***

**How to change the text ?** 

1\) Log into GOL IBE.

2\) Go to the section **Notification templates**.

3\) Choose notification you would like to amend.

4\) Click **EDIT** to change the text.



![](/images/docs/85205409b6f9f969.png)



5\) Click **EDIT** on the language version you would like to do the changes in.

6\) Make changes.

7\) Save changes.

**How to change the delivery?** 

Delivery means to whoom all notification goes to.

Beside each notification you will the list of all recepients.

In case there is YES = notification is sent to that recepient.

In case there is NO = notification is not sent to that recepient.



![](/images/docs/031b2f069efa0f81.png)



An overview about all sent notifications are stored in section **Notifications** - **Sent notifications**.

In case you would like to see whatever notification sent you may click \[SEND TO ME] beside the notification you would like to see again. In such case notification will be resent to your mailbox.



![](/images/docs/d516b3b070ac0e1a.png)



**How to avoid of notification non-delivery to your clients?** 

However, due to today's trend of maximum protection against spam the emails sent by GOL IBE on your behalf may not always be delivered to your customers.

Therefore, you need to set your emails / domain as follows:

If you use SPF, please allow our mail server in your domain settings:

**v=spf1 mx mx:golibe.com \~all**

If your domain already has an SPF record, then you must add the following SPF to the existing record:\
\
**include:golibe.com**

Allways add this CNAME record to your domain:

**golibe.\_domainkey.agentura.cz CNAME golibe.\_domainkey.golibe.com**

***

📩 Feel free to contact us at: [gol_support@cee-systems.com](mailto:gol_support@cee-systems.com).
