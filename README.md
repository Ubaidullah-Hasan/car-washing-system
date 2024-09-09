# Car Wash Booking System

## Introduction

Welcome to the Car Wash Booking System! This system allows users to register, log in, and book car wash services. Admin users can manage services and slots for bookings. The backend is built using TypeScript, Express.js, and MongoDB with Mongoose as the ODM.

## Features

- User registration and authentication
- Role-based access control (admin and user roles)
- CRUD operations for services and slots
- Booking management
- Error handling and input validation

## Technology Stack

- TypeScript
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens) for authentication

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v12 or later)
- npm (v6 or later)
- MongoDB (v4 or later)

## Installation

### Step 1: Clone the repository


```bash
git clone https://github.com/Ubaidullah-Hasan/car-washing-system.git
```

## Following steps
* Open the repository in a code editor
* Open terminal or command prompt then write <code>npm install</code>
* create .env file
```bash
PORT=3000
DATABASE_URL="your mongodb atlas database url past here"
NODE_ENV=development
SALT_ROUND=12
JWT_ACCESS_SECRET="Your secret key"
JWT_REFRESH_SECRET="Your secret key"
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d
```
<b> Run these command for spacific output </b>
  * <code> npm run start:dev </code> for ts file server running in development mode
  * <code> npm run start:prod </code> for js file server running
  * <code> npm run build </code> for converd ts to js
  * <code> npm run lint </code> identitify errors or warnings
  * <code> npm run lint:fix </code> slove basic errors or warnings
  * <code> npm run prettier </code> for formatting

## Live URL

The Car Wash Booking System is deployed and can be accessed at:
[https://car-wash-booking-system-server-henna.vercel.app/](https://car-wash-booking-system-server-henna.vercel.app/)