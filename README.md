## Overview:

Journey Craft Backend is a RESTful API built with Node.js and Express for managing hotels, admins, and users. It includes features for user registration, login, hotel creation, image uploads, and more. The application uses JWT for authentication and authorization, and MongoDB for database management.


## Features:

1. Admin Management:

    - Register Admin
    - Login Admin
    - Logout Admin

2. Hotel Management:

    - Create Hotel
    - Get All Hotels
    - Get Hotel by Name
    - Update Hotel Image

3. User Management:

    - Register User
    - Login User
    - Check Login Status
    - Logout User
    - Update Avatar
    - Get User Profile
    - Change Password
    - Update User Info


## Project Structure:

```
.
├── controllers
│   ├── admin.controller.js
│   ├── hotel.controller.js
│   └── user.controller.js
├── db
│   ├── index.js
├── middlewares
│   ├── auth.admin.js
│   ├── auth.middleware.js
│   └── multer.middleware.js
├── models
│   ├── hotel.model.js
|   ├── user.model.js
├── routers
│   ├── admin.routs.js
│   ├── hotel.routs.js
│   └── user.routs.js
├── utils
│   ├── app.js
|   ├── constants.js
|   ├── index.js
├── .env
├── package-lock.json
├── package.json
└── README.md

```


## Setup Instructions:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/journy-craft.git
cd journy-craft
```
2. Install dependencies:

```bash
npm install
```
3. Set up environment variables:

Create a .env file in the root directory with the following variables:
```
PORT=8000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongo_db_uri
```

4. Run the server:
```
npm start
```

## API Endpoints: 

**Admin Routes**
- POST /api/v1/admin/registerAdmin
    - Registers a new admin

- POST /api/v1/admin/login
    - Logs in an admin

- POST /api/v1/admin/logout
    - Logs out an admin
    
**Hotel Routes**
- POST /api/v1/hotels/createHotel
    - Creates a new hotel (Admin only)

- GET /api/v1/hotels/hotelByName
    - Gets a hotel by name

- GET /api/v1/hotels/allHotel
    - Gets all hotels

- PATCH /api/v1/hotels/hotelImage/:id
    - Updates hotel image (Authenticated users)

**User Routes**

- POST /api/v1/users/registerUser
    - Registers a new user

- POST /api/v1/users/login
    - Logs in a user

- GET /api/v1/users/isLoggedIn
    - Checks if user is logged in (Authenticated users)

- POST /api/v1/users/logout
    - Logs out a user (Authenticated users)

- PATCH /api/v1/users/avatar
    - Updates user avatar (Authenticated users)

- GET /api/v1/users/profile
    - Gets user profile (Authenticated users)

- PATCH /api/v1/users/changePassword
    - Changes user password (Authenticated users)

- PATCH /api/v1/users/updateUser
    - Updates user information (Authenticated users)


## Middlewares:

- auth.admin.js
    - Middleware for verifying admin privileges

- auth.middleware.js
    - Middleware for verifying JWT

- multer.middleware.js
    - Middleware for handling file uploads


## Database: 

The application uses MongoDB to store data. Ensure MongoDB is running and properly connected.


## License:

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for details.


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.


-----------------------------------------------------------------------------------------------------------------------------------------------

Feel free to customize the README.md file further to suit your preferences. If you have any questions or encounter any issues, please open an issue in the GitHub repository. 

**Happy coding!**