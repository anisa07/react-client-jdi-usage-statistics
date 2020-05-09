# react-client-jdi-usage-statistics
Client part to display info about JDI framework usage.
Server part can be found [here](https://github.com/anisa07/jdi-usage-statistic/tree/master)

### How to run statistic client:
1. Install packages with ```npm i```
1. Create **keys** folder in the root of the project. Create SSL certificate keys, generate **server.key** and **server.cert** put them into **keys** folder, make sure that **keys** folder  is added into **.gitignore**. Example how to generate [SSL](https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs)
1. Put [jdi-usage-statistics server](https://github.com/anisa07/jdi-usage-statistic) host into URL of **config.example.js**, remove **.example**, make sure that **config.js** is added into **.gitignore**
1. Run client with command ```npm run prod``` or ```npm run client:dev``` for developer purposes

### How to see statistics:
1. Login with secret creadentials
2. On the main page you can see and evaluate data and graphics
![Image of statistic](https://github.com/anisa07/react-client-jdi-usage-statistics/blob/master/assets/statistics.png)
![Image of graphics](https://github.com/anisa07/react-client-jdi-usage-statistics/blob/master/assets/graphic.png)
