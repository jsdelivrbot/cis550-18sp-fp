This folder is used for Database integration and cleaning

Connect to AWS EC2:
ssh -i "cis550.pem" ec2-user@ec2-18-188-160-119.us-east-2.compute.amazonaws.com

Import from commandline:
mongoimport --uri "mongodb://cis550:cis550@cis550-nosql-lkxnq.mongodb.net/test" --collection crime --drop --file crime.csv

URL used in application:
mongodb+srv://cis550:cis550@cis550-nosql-lkxnq.mongodb.net/test

How to connect to mongoDB via nodeJS:
https://docs.atlas.mongodb.com/driver-connection/?_ga=2.24700729.2069420753.1523217922-689833703.1519591236#node-js-driver-example