# YouTube-style Backend Scaffold

This project is a starting backend scaffold for a YouTube-style application. It includes:

- Express API structure
- MongoDB data models
- JWT authentication
- Video upload + Cloudinary storage
- Comments and video listing
- Global error handling and validation

## Folder structure

- `src/config/` � shared configuration and environment variables
- `src/controllers/` � request handlers for auth, video, and comments
- `src/routes/` � route definitions for auth, users, videos, and comments
- `src/middlewares/` � authentication, uploads, and error handling
- `src/models/` � MongoDB schemas for users, videos, and comments
- `src/services/` � Cloudinary integration and helper services
- `src/validators/` � Joi request validation schemas

## Services and technologies to use

- Node.js + Express
- MongoDB / MongoDB Atlas
- Mongoose for ODM
- JSON Web Tokens (JWT) for auth
- Cloudinary for media storage
- Multer for multipart upload handling
- Joi for request validation
- Helmet, CORS, Morgan for security and logging

## Setup steps

1. Copy `.env.example` to `.env`.
2. Set your MongoDB and Cloudinary values.
3. Run `npm install`.
4. Run `npm run dev` to start in development.
5. Open `http://localhost:8000/` in your browser to use the frontend tester.

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register new user |
| POST | /api/v1/auth/login | Login and get JWT |
| POST | /api/v1/auth/refresh | Refresh access token |
| POST | /api/v1/auth/logout | Logout user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/users/profile | Get current user |
| PATCH | /api/v1/users/profile | Update profile |
| PATCH | /api/v1/users/avatar | Upload avatar |

### Videos
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/videos | Get all videos |
| POST | /api/v1/videos | Upload video (protected) |
| GET | /api/v1/videos/:id | Get video by ID |
| DELETE | /api/v1/videos/:id | Delete video (protected) |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/comments/:videoId | Get comments |
| POST | /api/v1/comments/:videoId | Add comment (protected) |

## Where to start

1. Open `src/app.js` to see the API mount points.
2. Open `src/controllers/auth.controller.js` and `src/controllers/video.controller.js` to understand request flow.
3. Open `src/routes/` to inspect endpoints.
4. Open `src/middlewares/upload.middleware.js` to adjust upload restrictions.

## How to scale this project further

- Use a message queue for video processing
- Store raw videos in object storage like AWS S3
- Serve video content through a CDN
- Add Redis caching for feeds and metadata
- Add production logging and monitoring
