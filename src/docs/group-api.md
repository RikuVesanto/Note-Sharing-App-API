## Group

Group is a resource that represents data related to a group

### Register a group

Creates a new group

    POST groups/group

#### Parameters

Body as `GroupRegisterRequestDTO`
Field | Data Type | Required | Other restrictions | Description
--- | --- | --- | --- | ---
creatorId | string | Yes | | Id of the creator
name | string | Yes | Length 4-48 chars | Name of the group
description | string | No | Length 1-100 chars | Describe the group
password | string | No | Length 8-256 chars | Groups password

#### Responses

    Success response:
      201 Group was created
    Error responses:
      409 This group name is already in use
      422 Failed to create group, missing creator

#### Example

Request

    POST https://localhost:3000/groups/group

```json
{
	"creatorId": "1",
	"name": "Special Science Group",
	"description": "Group about some awesome science",
	"password": "12345678"
}
```

### Add user to group

Add new user to the group

    POST users/userconnection

#### Parameters

Body as `AddGroupsUserRequestDTO`
Field | Data Type | Required | Other restrictions | Description
--- | --- | --- | --- | ---
userId | string | Yes | | Id of user being added
groupId | string | Yes | | Id of the group

#### Responses

    Success response:
      201 Joined group
    Error responses:
      409 Could not join already in a group

#### Example

Request

    POST https://localhost:3000/users/userconnection

```json
{
	"userId": "1",
	"groupId": "15"
}
```

### Edit group info

Edit a groups info

    PUT groups/group

#### Parameters

Body as `GroupEditInfoRequest`
Field | Data Type | Required | Other restrictions | Description
--- | --- | --- | --- | ---
groupId | string | Yes | | Id of the group
name | string | Yes | Length 4-48 chars | Name of the group
description | string | No | Length 1-100 chars | Describe the group

#### Responses

    Success response:
      201 Group information changed
    Error responses:
      409 Group not found
      409 This group name is already in use

#### Example

Request

    PUT https://localhost:3000/groups/group

```json
{
	"creatorId": "1",
	"name": "Special Science Group",
	"description": "Group about some awesome science",
	"password": "12345678"
}
```

### Remove user from a group

Remove user from a group

    DELETE groups/userconnection/:groupId/:userId

#### Parameters

| Field   | Data Type | Required | Other restrictions | Description     |
| ------- | --------- | -------- | ------------------ | --------------- |
| groupId | string    | Yes      |                    | Id of the group |
| userId  | string    | Yes      | Length 8-256 chars | Id of the user  |

#### Responses

    Success response:
      200 Left Group
    Error responses:
      409 Not in group
      409 Group not found

#### Example

Request

    DELETE https://localhost:3000/groups/userconnection/:groupId/:userId

### Get list of users in a group

Get list of users in a group

    GET groups/userlist/:id

#### Parameters

| Field | Data Type | Required | Other restrictions | Description |
| ----- | --------- | -------- | ------------------ | ----------- |
| id    | string    | Yes      |                    | Groups id   |

#### Responses

    Success response:
      200

#### Example

Request

    GET https://localhost:3000/groups/userlist/:id

### Get list of groups that user is a part of

Get list of groups which a user is in

    GET groups/grouplist/:id

#### Parameters

| Field | Data Type | Required | Other restrictions | Description |
| ----- | --------- | -------- | ------------------ | ----------- |
| id    | string    | Yes      |                    | Users id    |

#### Responses

    Success response:
      200

#### Example

Request

    GET https://localhost:3000/groups/grouplist/:id

### Get list of groups that meet a search pattern

Get list of groups that have a certain string as part of their name

    GET groups/searchlist/:search

#### Parameters

| Field  | Data Type | Required | Other restrictions | Description          |
| ------ | --------- | -------- | ------------------ | -------------------- |
| search | string    | Yes      |                    | String to search for |

#### Responses

    Success response:
      200

#### Example

Request

    GET https://localhost:3000/groups/searchlist/:search

### Check if a user is the creator of the group

Checks if user is the creator of the group, return true if he is and false otherwise

    GET groups/group/creator/:groupId/:userId

#### Parameters

| Field   | Data Type | Required | Other restrictions | Description     |
| ------- | --------- | -------- | ------------------ | --------------- |
| groupId | string    | Yes      |                    | Id of the group |
| userId  | string    | Yes      |                    | Id of the user  |

#### Responses

    Success response:
      200

#### Example

Request

    GET https://localhost:3000/groups/group/creator/:groupId/:userId
