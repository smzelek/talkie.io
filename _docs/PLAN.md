
# PLAN

## Frontend
* Preact with Typescript https://preactjs.com/guide/v10/typescript/ 
    * Pre-rendered main view
    * Gzipped
    * Optimized
    * frontend Routes: 
        * LOGIN
        * CHAT
            * CHAT/{id}
    * Use WSS on the frontend to listen to backend push updates after initial snapshot. Need to know “currentLatest snowflake seen” (?) so we know what snowflakes are new. Then push to all online members of the chatroom (have WS connection) any DELTAS to their snapshot to update the frontend with
    * Also use WSS on the frontend to listen to “other user is typing” events.

## Backend
* NodeJS + Express
    * Can express return a serverside HTML response for existing Chatrooms?
    * Routes:
        * POST Login
        * DELETE Logout
        * POST new user
        * POST new room
        * GET room list
        * GET recent messages for room (MAX of 50)

## Database
https://app.creately.com/diagram/506HtTwESno/edit

* MongoDB
    * Schemas:
        * User table
            * User_id bigint (PK) ❄️
            * User_name text
            * name text
        * Messages table 
            * Message_id bigint (PK) ❄️
            * Chatroom_id bigint (FK) 
            * Author_id bigint (FK)
            * Content text
        * Chatrooms table
            * Chatroom_id bigint (PK) ❄️
            * Chatroom_name text
            * Chatroom_creator_id bigint (FK)
    * Posting in a room automatically makes you a "member" of that room and subscribes you to all updates to that room while online thru WSS.

## DevOps
* Always run app in Docker while developing to ensure it works the whole time and doesn’t randomly stop working at the end.