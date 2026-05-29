## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register new user |
| POST | /api/v1/auth/login | Login and get JWT |
| POST | /api/v1/auth/refresh | Refresh access token |
| POST | /api/v1/auth/logout | Logout user |

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
| GET | /api/v1/comments/:videoId | Get video comments |
| POST | /api/v1/comments/:videoId | Add comment (protected) |