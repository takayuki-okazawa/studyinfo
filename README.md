##Local

####mongodb
* $ mongod --dbpath=/Users/okazawa/src/sports_database/mongodata --fork --logpath=/Users/okazawa/src/sports_database/log/mongodb.log

####node.js
* forever server/soccer-jp.js 


##Server

####file set
* sudo rm -f -r /var/www/html/*
* sudo mv * /var/www/html
* sudo chmod -R -755 /var/www/html
* cd ../
* rm -r cliant
* rm readme.md
* rm -r document
* cd server
* sudo rm -f -r /var/www/cgi-bin/server/*
* sudo mv * /var/www/cgi-bin/server/

####Nginx
* sudo /usr/local/nginx/sbin/nginx -s reload

####mongodb
//Master(111.111.111.11/hoge01)
sudo mongod --master --dbpath /var/lib/mongo --fork --logpath=/var/www/cgi-bin/log/mongodb.log

 //Slave(11.111.111.12/hoge01)
 sudo mongod --slave --port 27018 --source 10.254.114.83:27017 --dbpath /var/lib/mongo --fork --logpath=/var/www/cgi-bin/log/mongodb.log

####node.js
* forever list
* sudo klill -9 0
* forever start /var/www/cgi-bin/server/soccer-jp.js
