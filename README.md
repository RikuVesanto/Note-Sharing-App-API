# Note Sharing App API

## REST API documentation

[User](src/docs/user-api.md) (/users/)

-   Registration for users
-   Login for users
-   Modifying user data
-   Modifying user password
-   Getting users id

[Group](src/docs/group-api.md) (/groups/)

-   Create a group
-   Add user to a group
-   Edit a groups data
-   Remove user from a group
-   Get list of users in a group
-   Get list of groups which a user is a part of
-   Get list of groups which name meets a search criteria
-   Check if a user is the creator of the group
-   Change creator of the group

[Topic](src/docs/topic-api.md) (/topics/)

-   Create a topic
-   Modify a topics data
-   Get list of topics that fall under a group

[Note](src/docs/note-api.md) (/notes/)

-   Create a note
-   Get a list notes that fall under a topic
-   Modify a notes data
-   Delete a note
