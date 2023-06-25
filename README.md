# todo-later-server

Todo-Later Server is an Express application that serves as the back-end for Todo-Later, the todo app. This server-side application provides API routes that are consumed by the [Todo-Later Client](https://github.com/Kylewuzhere/todo-later-client) app. It is designed to handle CRUD (Create, Read, Update, Delete) operations on todo items. The server is built using Express, and the API routes are protected to ensure authenticated access.

## Technologies used

- Express.js - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="30"/>
- Node.js - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="30"/>
- Jest - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" height="30"/>
- Auth0 - <picture><source media="(prefers-color-scheme: light)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" height="30">
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_dark_mode.png" height="30">
    <img alt="Auth0 Logo" src="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" height="30"></picture>
- Docker - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height="30"/>
- PostgreSQL - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="30"/>
- Railway - <picture><source media="(prefers-color-scheme: light)" srcset="https://railway.app/brand/logo-light.png" height="30">
    <source media="(prefers-color-scheme: dark)" srcset="https://railway.app/brand/logo-dark.png" height="30">
    <img alt="Auth0 Logo" src="https://railway.app/brand/logo-light.png" height="30"></picture>

          


## API Routes

The Todo-Later Server exposes the following API routes:

- GET /api/todos: Retrieves all todo items.
- GET /api/todos/:id: Retrieves a specific todo item by its ID.
- POST /api/todos: Creates a new todo item.
- PUT /api/todos/:id: Updates a todo item by its ID.
- DELETE /api/todos/:id: Deletes a todo item by its ID.

Please note that all the /api/todos endpoints are protected, meaning that authentication is required to access them.

## Routes for Testing

In addition to the API routes used by the Todo-Later Client, the server provides the following routes specifically for testing purposes:

- GET /api/health: A health check route that sends a JSON response { "message": "OK!" } to indicate that the server is running correctly.
- GET /api/public: A public route that sends a JSON response { "message": "Public OK!" }. This route does not require authentication and is available for testing or public access.
- GET /api/private: A protected endpoint that requires authentication. It sends a JSON response { "message": "Private OK!" } to indicate successful access. Only authenticated users can access this route.

These testing routes help verify the server's functionality and test the authentication process.

## Getting Started

Before you can run the Todo-Later Server, you will need to create an Auth0 API app to protect the endpoints.

- Sign up for an Auth0 account at https://auth0.com/ if you don't have one already.
- Click on the "Create API" button and provide a name and an identifier for your API.
- Go to the "Quick Start" tab of your API application and click Node.js
- Configure the [src/middleware/authorizationMiddleware.js](https://github.com/Kylewuzhere/todo-later-server/blob/6ca835e90cc419ad2c85d37e77af8acae4d80402/src/middleware/authorizationMiddleware.js) using the values under jwtCheck or create a .env file and to store those values.

To start the server:

```
npm start
```

or visit the Docker section below.

Navigate to  http://localhost:5000/api/health to access the server.

## Testing

```
npm test
```

## Database

Todo-Later Server utilizes pg pooling to establish a connection with a PostgreSQL database. The database is hosted on Railway app, providing a robust and scalable storage solution for the todo items. Visit [Railway](https://railway.app/) to host your database.

## Deployment

The repository for Todo-Later Server is deployed on Railway app, which provides a seamless and hassle-free deployment process. For security purposes, you will not have access to my Railway app and database.

## Docker

Build the image and run container:

```
docker compose up -build
```
