# MERN Full Stack App

This is a full-stack MERN application where users can create, edit, and delete records, equipment, and rewards.

## Features

- Create, edit, and delete records
- Create, edit, and delete equipment
- Create, edit, and delete rewards

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone this repository

2. Navigate to the project directory:

```
cd <path to directory>
```

3. Run the following command to build and start the Docker containers:
```
docker-compose up
```

This will build the client, server, and database containers and start them. It might take a few minutes for the initial build.

4. Once the containers are up and running, open your browser and navigate to:

http://localhost:3000


This will open the application, and you can start creating, editing, and deleting records, equipment, and rewards.

## Stopping the Application

1. To stop the application, press `CTRL + C` in the terminal where you ran `docker-compose up`.

2. You can also run the following command in a separate terminal to stop the containers:

```
docker-compose down
```


## Built With

- [React](https://reactjs.org/) - Front-end library
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Node.js web application framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database

