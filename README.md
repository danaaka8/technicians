API Endpoints:

1. Send Reset Password Email

- Endpoint: /api/reset-password/email
- Method: POST

Request body:
- email: The email of the user requesting a password reset.

Response:
- Status 200: Reset password email sent successfully
- Status 404: User not found
- Status 500: Internal server error

2. Verify Reset Password OTP

- Endpoint: /api/reset-password/otp
- Method: POST

Request body:
- email: The email of the user requesting a password reset.
- otp: The one-time password for verification.
- newPassword: The new password for the user.

Response:
- Status 200: Password reset successfully
- Status 401: Invalid OTP
- Status 404: User not found
- Status 500: Internal server error

3. Get All Users

- Endpoint: /api/users
- Method: GET

Response:
- Status 200: Array of user objects

4. Register

- Endpoint: /api/register
- Method: POST

Request body:
- name: The name of the user.
- email: The email of the user.
- password: The password of the user.

Response:
- Status 200: The newly created user object
- Status 400: Email already exists
- Status 500: Internal server error

5. Login

- Endpoint: /api/login
- Method: POST

Request body:
- email: The email of the user.
- password: The password of the user.

Response:
- Status 200: The user object if login successful
- Status 401: Invalid password
- Status 404: User not found
- Status 500: Internal server error

6. Get User

- Endpoint: /api/users/:id
- Method: GET

Response:
- Status 200: The user object
- Status 404: User not found
- Status 500: Internal server error

7. Delete User

- Endpoint: /api/users/:id
- Method: DELETE

Response:
- Status 200: User deleted successfully
- Status 404: User not found
- Status 500: Internal server error

8. Update User

- Endpoint: /api/users/:id
- Method: PUT

Request body:
- name: The updated name of the user.
- email: The updated email of the user.

Response:
- Status 200: The updated user object
- Status 400: Email already exists with another user
- Status 404: User not found
- Status 500: Internal server error
