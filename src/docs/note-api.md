## Note

Note is a resource that represents data related to a note within a topic

### Register a note

Create a new note

    POST notes/note

#### Parameters

Body as `NoteRegisterRequestDTO`
Field | Data Type | Required | Other restrictions | Description
--- | --- | --- | --- | ---
topicId | string | Yes | | id of the topic
title | string | No | Length 1-48 chars | title of the note
content | string | Yes | | content of the note

#### Responses

    Success response:
      201 Note created
    Error responses:
      409 Failed to create note, missing topic

#### Example Request

    POST https://localhost:3000/notes/note

```json
{
	"topicId": "3",
	"title": "Some descriptive title",
	"content": "Text that is very informational about this given topic and warrants greating this great note."
}
```

### Edit a note

Edit a notes info

    PUT notes/note

#### Parameters

Body as `NoteEditRequestDTO`
Field | Data Type | Required | Other restrictions | Description
--- | --- | --- | --- | ---
noteId | string | Yes | | id of the note
title | string | No | Length 1-48 chars | title of the note
content | string | Yes | | content of the note

#### Responses

    Success response:
      201 Note edited
    Error responses:
      409 Note not found

#### Example Request

    PUT https://localhost:3000/notes/note

```json
{
	"noteId": "7",
	"title": "Some descriptive title",
	"content": "Text that is very informational about this given topic and warrants greating this great note."
}
```

### Delete a note

Delete a note

    DELETE notes/note

#### Parameters

| Field | Data Type | Required | Other restrictions | Description |
| ----- | --------- | -------- | ------------------ | ----------- |
| id    | string    | Yes      |                    | Notes id    |

#### Responses

    Success response:
      200
    Error responses:

#### Example Request

    DELETE https://localhost:3000/notes/note

### Get list of notes

Get all of topics notes

    GET topics/notelist/:id

#### Parameters

| Field | Data Type | Required | Other restrictions | Description |
| ----- | --------- | -------- | ------------------ | ----------- |
| id    | string    | Yes      |                    | Topics id   |

#### Responses

    Success response:
      200

#### Example Request

    PUT https://localhost:3000/topics/topic/:id
