## Topic

Topic is a resource that represents data related to a topic within a group.

### Register a new topic

Add a new topic

    POST topics/topic

#### Parameters

Body as `TopicRegisterRequestDTO`
Field | Data Type | Required | Other restrictions | Description
--- | --- | --- | --- | ---
groupId | string | Yes | | Id of the group
topic | string | Yes | Length 1-48 chars | Topic
description | string | No | Length 1-100 chars | Describe the topic

#### Responses

    Success response:
      201 Topic created
    Error responses:
      409 Failed to create topic, missing group

#### Example Request

    POST https://localhost:3000/topics/topic

```json
{
	"groupId": "5",
	"topic": "History",
	"description": "World history from the 20th century"
}
```

### Edit a topics info

Edit info of a topic

    PUT topics/topic

#### Parameters

Body as `TopicEditRequestDTO`
Field | Data Type | Required | Other restrictions | Description
--- | --- | --- | --- | ---
id | string | Yes | | Id of the topic
topic | string | Yes | Length 1-48 chars | topic
description | string | No | Length 1-100 chars | describe the topic

#### Responses

    Success response:
      201 Topic Edited
    Error responses:
      409 Topic not found

#### Example Request

    PUT https://localhost:3000/topics/topic

```json
{
	"id": "3",
	"topic": "History",
	"description": "World history from the 20th century"
}
```

### Get a groups topics

Get list of topics from a group

    GET topics/topiclist/:id

#### Parameters

| Field | Data Type | Required | Other restrictions | Description |
| ----- | --------- | -------- | ------------------ | ----------- |
| id    | string    | Yes      |                    | groups id   |

#### Responses

    Success response:
      200
    Error responses:

#### Example Request

    GET https://localhost:3000/topics/topiclist/:id
