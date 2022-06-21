# basic-auth-mdnh-wk2

An Express/Node.js based server using a custom “authentication” module that is designed to handle user registration and sign in using Basic, Bearer, or OAuth along with a custom “authorization” module that will grant/deny users access to the server based on their role or permissions level.

1. Users can create an account, associated with a “role”

2. User Roles will be pre-defined and will each have a list of allowed capabilities
    - admin can read, create, update, delete
    - editor can read, create, update
    - writer can read, create
    - user can read

3. Users can then login with a valid username and password

4. Alternatively, users can login using an OAuth provider such as Google or GitHub
    - In this case, users should be automatically assigned the role of user

5. Once logged in, Users can then access any route on the server, so long as they are permitted by the capabilities that match their role.

## Technical Requirements

The application will be created with the following overall architecture and methodologies

1. Node.js
2. ES6 Classes and best practices
3. ExpressJS Web Server, built modularly
4. User Persistence using a Mongo Database (NoSQL)
5. Test Driven Development, using Jest
6. Deployment to Heroku