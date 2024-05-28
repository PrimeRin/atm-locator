# Description

This application is designed to manage ATMs throughout Bhutan, providing a comprehensive system for easy tracking and administration. The application enables users to monitor the status and location of ATMs, ensuring efficient maintenance and accessibility. It also offers features for adding new ATMs, updating existing information, and categorizing ATMs based on various criteria. The system is built to facilitate seamless management and quick access to essential details, enhancing the overall ATM network management experience in Bhutan.

# Installation

1. Clone repo

``` 
git clone git@github.com:PrimeRin/atm-locator.git
```

2. Set up backend (express)

``` cd /backend

add .env file and env variables

npm install

npm start
```

3.  Set up frontend (react)

```
cd /frontend

npm install

npm start
```


4. set up db(mysql)

 -  login to db

 ```
  mysql -u your_username -p 
  ```

 - create db name

``` 
CREATE DATABASE atm_datas;

use atm_datas
```

 - create table users
```

CREATE TABLE users (

id VARCHAR(50) PRIMARY KEY,

username VARCHAR(50) NOT NULL,

password VARCHAR(255) NOT NULL,

bank ENUM('BOB', 'BNB', 'DK', 'TB', 'BDBL', 'DPNB') NOT NULL,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

- create table atm_details

```
CREATE TABLE atm_details (

id VARCHAR(50) PRIMARY KEY,

name VARCHAR(100) NOT NULL,

gewog VARCHAR(100),

dzongkhag VARCHAR(100),

bank_category ENUM('BOB', 'BNB', 'DK', 'TB', 'BDBL', 'DPNB') NOT NULL,

email VARCHAR(100),

website VARCHAR(100),

phone VARCHAR(20),

latitude DECIMAL(10, 7),

longitude DECIMAL(10, 7),

service_status VARCHAR(50),

creator_id VARCHAR(50),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

location_name VARCHAR(100),

custom_time DATETIME

);
```

5. seed db
```
npm run seed-user

npm run seed-atm
```

# How to contribute
```
1. Create new branch from dev/master
1. Create PR
1. PR should be approved to be merged.
```








