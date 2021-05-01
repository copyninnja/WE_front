

author: Gong Xiaofeng

## Features.

-  Authentication - The basic login/register functions

- remember me - local storage

- cookie - user will be granted with a cookie after successfully login

- forget password - using email to notify users to change password

- customized avatar- allow user to use their own icon

- accept distance - user can choose stories they wanna see with a slide bar

- write story - user can write story in text,image, audio and video, the system will record user's fuzzy location

- fuzzy location - the system will dim the user's location by truncating user's location

- anonymous - user can choose to be anonymous when writing story so that other user couldn't see your name and subscribe you

- nearby story - user can see their nearby stories within their accept distance

-  subscribe - user can subscribe other users, one-way subscribe will pop a notice while bidirectional subscription will pop up a "match" which enable users to chat.

- Page segmentation -  used for segmentation in nearby story page

- Menu bar - the bar is fixed on the top. If user scroll down it will appear while it would be invisible when user scroll up.

- upload images - the images will be stored in the database named as the timestamps

- chat - users that subscribed each other can chat in a delicate chat box with interesting images

- conversation list - all the conversations will be listed

- purchase - user can purchase products listed in the shop page

- item card - item card is equipped with regular operation buttons

- account - user can have a financial account used for purchasing items

- shipping - user can choose different ways of shipping with their current address

- payment - in the final process of purchasing , user can choose different ways to pay

- bill - user will get a bill of what they bought after transaction finished successfully

- Map - markers show different places and user location

- Cluster - markers will be clustered when user zoom out

- News - get latest news crawled from different websites implemented by News API

- Weather forecast - get a weather forecast for next 24 hours including thermos, humidity, wind

  ## Setup requirements

```bat
  npm install
  npm run build
  npm start
```

  customize your Google API key

  A key for email supports SMTP

  an openweather API key

  a News API key

  register a Snipcart account and configure your website
  
  register a ButterCMS account and manage your products
  
  A cypress account
  
  
  
  
  
  
  
  ## API Data Model.
  
  see backend: https://github.com/copyninnja/WE_back
  



  ## 	User Interface Design.

- Brand Image 

![image-20210427174831291](./public/Readme/image-20210427174831291.png)

​												

- Login Page



![image-20210427174843596](./public/Readme/image-20210427174843596.png)

- Find password Page

![image-20210427174947560](./public/Readme/image-20210427174947560.png)

- Register Page

  ![image-20210427175015887](./public/Readme/image-20210427175015887.png)

- Information Refine Page

![image-20210427175104760](./public/Readme/image-20210427175104760.png)



- Menu Bar

  ![image-20210427175134820](./public/Readme/image-20210427175134820.png)

- Story Page

![image-20210427175154836](./public/Readme/image-20210427175154836.png)

- One way Subscribe user alert

![image-20210427175212459](./public/Readme/image-20210427175212459.png)

- Two users subscribed each other

  ![image-20210427175225850](./public/Readme/image-20210427175225850.png)

- Write Story Page

<img src="./public/Readme/image-20210427175239548.png" alt="image-20210427175239548" style="zoom:67%;" />

- Chat Page

![image-20210427175303326](./public/Readme/image-20210427175303326.png)

- Chat with a specific person Page

![image-20210427175322353](./public/Readme/image-20210427175322353.png)

- Shop Page

![image-20210427175340178](./public/Readme/image-20210427175340178.png)

- My Account

![image-20210427175400988](./public/Readme/image-20210427175400988.png)

- Financial account register

![image-20210427175420494](./public/Readme/image-20210427175420494.png)

- Cart Summary

![image-20210427175442144](./public/Readme/image-20210427175442144.png)

- Shipping

  ![image-20210427175508974](./public/Readme/image-20210427175508974.png)

- Payment

  ![image-20210427175518643](./public/Readme/image-20210427175518643.png)

- Invoice

![image-20210427175547594](./public/Readme/image-20210427175547594.png)

- Map Page

![image-20210427175606567](./public/Readme/image-20210427175606567.png)

- Weather 

![image-20210427175626301](./public/Readme/image-20210427175626301.png)



- News

![image-20210427175712343](./public/Readme/image-20210427175712343.png)

- Profile Page

![image-20210427175733546](./public/Readme/image-20210427175733546.png)



