# Community Hub API Documentation

## Introduction

Welcome to the Community Hub Application. This project is a SaaS platform designed to enable users to create and manage their own communities. Users can sign up, sign in, view all communities, create their own communities, add and remove members, and view all community members. The platform is built using Node.js, leveraging PostgreSQL as the database, and utilizes Prisma as the ORM. Snowflake IDs are used for unique identification of users, communities, roles, and members, ensuring scalability and uniqueness.

## Features

- **Authentication**: User registration and login.
- **Community Management**: Create, view, and manage communities.
- **Member Management**: Add and remove members from communities.

## Technical Stack

- **Language**: Node.js v14+
- **Database**: PostgreSQL
- **ORM**: Prisma
- **ID Generation**: @theinternetfolks/snowflake for unique Snowflake IDs

## Getting Started

### Prerequisites

- Node.js v14+
- PostgreSQL
- Prisma

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/niyatimadaan/CommunityHub.git
   ```
2. Install dependencies:
   ```
   cd community-hub
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication

- **Sign Up**: `POST /v1/auth/signup`
- **Sign In**: `POST /v1/auth/signin`
- **Get Me**: `GET /v1/auth/me`

### Community

- **Create Community**: `POST /v1/community`
- **Get All Communities**: `GET /v1/community`
- **Get All Members**: `GET /v1/community/:id/members`
- **Get My Owned Community**: `GET /v1/community/me/owner`
- **Get My Joined Community**: `GET /v1/community/me/member`

### Member

- **Add Member**: `POST /v1/member`
- **Remove Member**: `DELETE /v1/member/:id`

## Using Postman

To test the API endpoints, you can use the provided `Community Hub.postman.json` collection file. Import this file into Postman to start testing the API.