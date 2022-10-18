## User

User is a resource that represents data related to a user of the application.

### Register a user

Creates a new user

    POST users/user

#### Parameters

Body as `UserRegisterRequestDTO`
Field | Data Type | Required | Other restrictions | Description
--- | --- | --- | --- | ---
email | string | Yes | Email format | Users email
username | string | Yes | Length 4-32 chars | Users username
password | string | Yes | Length 8-256 chars | Users password
name | string | No | | Users name

#### Responses

    Success response:
      201 Registration successful
    Error responses:
      409 This email is already in use
      409 This username is already in use

#### Example

Request

    POST https://localhost:3000/users/user

```json
{
	"email": "kalle@gmail.com",
	"username": "kallekalle",
	"password": "12345678"
}
```

### Login a user

Confirms a users login attempt and return JWT

    GET users/user/:username/:password

#### Parameters

Body as `UserLoginRequestDTO`
Field | Data Type | Required | Other restrictions | Description
--- | --- | --- | --- | ---
username | string | Yes | Length 4-32 chars | Users username
password | string | Yes | Length 8-256 chars | Users password

#### Responses

    Success response:
      201
    Error responses:
      401 Incorrect password
      401 Username not found

#### Example

Request

    GET https://localhost:3000/users/user/:username/:password

```json
{
	"username": "kallekalle",
	"password": "12345678"
}
```

### Edit user info

Edit a users info

    PUT users/user

#### Parameters

Body as `EditUserInfoRequestDTO`
Field | Data Type | Required | Other restrictions | Description
--- | --- | --- | --- | ---
id | string | Yes | | Users id
email | string | Yes | Email format | Users email
username | string | Yes | Length 4-32 chars | Users username
name | string | No | | Users name

#### Responses

    Success response:
      201 User info changed
    Error responses:
      401 User not found
      409 This email is already in use
      409 This username is already in use

#### Example

Request

    PUT https://localhost:3000/users/user/password

```json
{
	"id": "1",
	"email": "kalle@gmail.com",
	"username": "kallekalle",
	"password": "12345678"
}
```

### Edit users password

Change users password

    PUT users/user/password

#### Parameters

Body as `EditUserPasswordRequestDTO`
Field | Data Type | Required | Other restrictions | Description
--- | --- | --- | --- | ---
id | string | Yes | | Users id
oldPassword | string | Yes | Length 8-256 chars | Users old password
password | string | Yes | Length 8-256 chars | Users new password

#### Responses

    Success response:
      201 Password Changed
    Error responses:
      401 User not found
      422 Incorrect Password

#### Example

Request

    PUT https://localhost:3000/users/user/password

```json
{
	"id": "1",
	"oldPassword": "12345678",
	"password": "A78/jkl*^#2fjk"
}
```

### Get a user

Get user based on an id

    GET users/user/:id

#### Parameters

| Field | Data Type | Required | Other restrictions | Description |
| ----- | --------- | -------- | ------------------ | ----------- |
| id    | string    | Yes      |                    | Users id    |

#### Responses

    Success response:
      200
    Error responses:
      401 Username not found

#### Example

Request

    GET https://localhost:3000/users/user/:id
