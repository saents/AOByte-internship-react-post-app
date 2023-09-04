# Posts Project Web Application

Welcome to the **Posts Project Web Application**! This web application allows users to register an account, create posts on any topic, leave comments on posts, and rate them. The project is built using React.js for the front end, Ant Design for the UI Kit, Node.js and Express.js for the server, and JWT authorization for user authentication.

## Table of Contents

1. [**Project Overview**](#project-overview)
2. [**Features**](#features)
3. [**Prerequisites**](#prerequisites)
4. [**Getting Started**](#getting-started)
    - [Client](#client)
    - [Server](#server)
5. [**Usage**](#usage)
6. [**Contributing**](#contributing)
7. [**License**](#license)

## Project Overview

The **Posts Project Web Application** is a platform that allows users to:

- Register and authenticate their accounts.
- Create, edit, and delete posts on various topics.
- Leave comments on posts.
- Rate posts.
- And more!

## Features

- **User Registration**: Users can register an account, verified their accounts, to start using the application.

- **User Authentication**: JWT (JSON Web Token) authentication is used to secure user data and actions.

- **Create Posts**: Authenticated and verified users can create new posts with a title and content.

- **Edit and Delete Posts**: Users can edit and delete their own posts.

- **Leave Comments**: Users can leave comments on posts made by others.

- **Rate Posts**: Users can rate posts, providing feedback to the community.

- **UI Kit**: The application's user interface is built using the Ant Design UI Kit for a sleek and modern look.

## Prerequisites

Before you can run the application, make sure you have the following prerequisites installed:

- **Node.js and npm**: [Download and Install Node.js](https://nodejs.org/)

## Getting Started

### Frontend

To run the frontend of the application, follow these steps:

1. Navigate to the `client` directory in your terminal.

2. Install the required dependencies by running:

    ```bash
    npm install --force
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. The frontend should now be running on `http://localhost:3000` in your browser.

### Server

To run the server of the application, follow these steps:

1. Navigate to the `server` directory in your terminal.

2. Install the required dependencies by running:

    ```bash
    npm install --force
    ```

3. Configure the server by editing the `.env` file with your database and JWT secret information.

4. Start the server:

    ```bash
    npm run dev
    ```

5. The server should now be running on the specified port (default is `http://localhost:5000`).

## Usage

Once both the frontend and server are running, you can access the web application by opening a web browser and navigating to `http://localhost:3000`. From there, you can register an account, create posts, leave comments, and enjoy all the features of the Posts Project Web Application. You can use test account. **Login - jiyawof499@docwl.com, Password - 123**.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
