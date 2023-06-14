# User API Endpoints:

1. Send Reset Password Email

- Endpoint: `/api/users/reset-password`
- Method: POST

Request body:
- email: The email of the user.

Response:
- Status 200: Reset password email sent successfully
- Status 404: User not found
- Status 500: Internal server error

2. Verify Reset Password OTP

- Endpoint: `/api/users/verify-otp`
- Method: POST

Request body:
- email: The email of the user.
- otp: The one-time password (OTP) entered by the user.
- newPassword: The new password to be set for the user.

Response:
- Status 200: Password reset successfully
- Status 404: User not found
- Status 401: Invalid OTP
- Status 500: Internal server error

3. Get All Users

- Endpoint: `/api/users`
- Method: GET

Response:
- Status 200: Array of user objects
- Status 500: Internal server error

4. Register

- Endpoint: `/api/users/register`
- Method: POST

Request body:
- name: The name of the user.
- email: The email of the user.
- password: The password of the user.

Response:
- Status 200: The newly registered user object
- Status 400: Email already exists
- Status 500: Internal server error

5. Login

- Endpoint: `/api/users/login`
- Method: POST

Request body:
- email: The email of the user.
- password: The password of the user.

Response:
- Status 200: The user object
- Status 401: Invalid password
- Status 404: User not found
- Status 500: Internal server error

6. Get User

- Endpoint: `/api/users/:id`
- Method: GET

Response:
- Status 200: The user object
- Status 404: User not found
- Status 500: Internal server error

7. Delete User

- Endpoint: `/api/users/:id`
- Method: DELETE

Response:
- Status 200: User deleted successfully
- Status 404: User not found
- Status 500: Internal server error

8. Update User

- Endpoint: `/api/users/:id`
- Method: PUT

Request body:
- name: The updated name of the user.
- email: The updated email of the user.

Response:
- Status 200: The updated user object
- Status 400: Email already exists with another user
- Status 404: User not found
- Status 500: Internal server error

# Technician API Endpoints:

1. Create Technician

- Endpoint: `/api/technicians`
- Method: POST

Request body:
- image: The image URL of the technician.
- name: The name of the technician.
- email: The email of the technician.
- phone: The phone number of the technician.
- location: The location of the technician.
- category: The category of the technician.

Response:
- Status 201: The newly created technician object
- Status 400: Email already exists
- Status 500: Internal server error

2. Get All Technicians

- Endpoint: `/api/technicians`
- Method: GET

Response:
- Status 200: Array of technician objects
- Status 500: Internal server error

3. Get Technician by ID

- Endpoint: `/api/technicians/:id`
- Method: GET

Response:
- Status 200: The technician object
- Status 404: Technician not found
- Status 500: Internal server error

4. Update Technician

- Endpoint: `/api/technicians/:id`
- Method: PUT

Request body:
- image: The updated image URL of the technician.
- name: The updated name of the technician.
- email: The updated email of the technician.
- phone: The updated phone number of the technician.
- location: The updated location of the technician.
- category: The updated category of the technician.

Response:
- Status 200: The updated technician object
- Status 400: Email already exists
- Status 404: Technician not found
- Status 500: Internal server error

5. Delete Technician

- Endpoint: `/api/technicians/:id`
- Method: DELETE

Response:
- Status 200: Technician deleted successfully
- Status 404: Technician not found
- Status 500: Internal server error
