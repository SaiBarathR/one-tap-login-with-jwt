# Login App with JWT and One Tap Login Client

Note that this is the client side of the app. The server side can be found [JWT Login Node Service](https://github.com/SaiBarathR/jwt-login-node-service).

This is a simple login app using JWT authentication with Sign in / Sign up, Sign in with Google and One Tap Login and Sign in with Facebook. The app is built with Node.js, Express, PostgreSQL, Sequelize ORM, JWT, Google One Tap and Facebook OAuth.

The app is built with Vite and React. The UI is built with Next UI and Tailwind CSS. The animations are done with Framer Motion.

The server side is deployed on Heroku and the client side is deployed on netlify. The app can be found [here](https://login-page-with-jwt-auth-one-tap-sign.netlify.app/login).

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Prerequisites](#prerequisites)
- [Api Reference](#api-reference)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Built With Vite and React](#built-with-vite-and-react)
- [License](#license)

## Features

- Sign in / Sign up with email and password
- Sign in with Google
- One Tap Login
- Sign in with Facebook
- JWT authentication
- React Router

## Screenshots

### Home Page Sign in
![Screenshot 2023-12-31 at 5 32 34 PM](https://github.com/SaiBarathR/login-page-with-jwt-auth-one-tap-sign-in/assets/58382813/55b118c0-5fc9-4906-97ae-7668d785bb7e)

### Home Page Sign up
![Screenshot 2023-12-31 at 5 31 07 PM](https://github.com/SaiBarathR/login-page-with-jwt-auth-one-tap-sign-in/assets/58382813/ce4bb277-d365-4b59-b733-98d2c5d29c90)

### Loading Screen

![Screenshot 2023-12-31 at 5 36 15 PM](https://github.com/SaiBarathR/login-page-with-jwt-auth-one-tap-sign-in/assets/58382813/7408d9c6-12d1-4948-bbcc-0f928031240c)

### User Data

![Screenshot 2023-12-31 at 5 38 08 PM](https://github.com/SaiBarathR/login-page-with-jwt-auth-one-tap-sign-in/assets/58382813/9a27c557-a36b-44fa-8ac6-173e718190cf)


### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Google One Tap](https://developers.google.com/identity/one-tap/web/overview)
- [Facebook OAuth](https://developers.facebook.com/docs/facebook-login/web)
- [Google People API](https://developers.google.com/people/quickstart/js)

### Api Reference

-  Google Api - https://medium.com/analytics-vidhya/adding-sign-in-with-google-to-your-website-b82755b79b31 
- Facebook SDK - https://dev.to/quod_ai/how-to-integrate-facebook-login-api-into-your-react-app-33de

### Installation

1. Clone the repo

```sh
git clone https://github.com/SaiBarathR/login-page-with-jwt-auth-one-tap-sign-in.git
```

2. Install NPM packages

```sh
cd login-page-with-jwt-auth-one-tap-sign-in

npm install
```

### Configuration

Environment variables

- Create a `.env` file in the root directory of the project.
- Add the following environment variables to the `.env` file.

```sh

VITE_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID 

VITE_APP_FACEBOOK_APP_ID=YOUR_FACEBOOK_APP_ID

VITE_APP_BASE_URL=http://localhost:[Port of node server]/api

```

### Usage

1. Run the app

```sh
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Built With Vite and React

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next UI](https://nextui.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [JWT Decode](https://www.npmjs.com/package/jwt-decode)
- [React OAuth Google](https://www.npmjs.com/package/@react-oauth/google)
- [Vite](https://vitejs.dev/)

### License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Sai Barath - [LinkedIn](https://www.linkedin.com/in/saibarath-r/) 







