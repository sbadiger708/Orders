##DEVELOPER DETAILS
#Name: SHIVAKUMAR
#Email: sbadiger708@gmail.com

## START RUNNING
$ npm install
$ nodemon app.js

### DETAILS
##DATABASE NAME
testdb
##DATABASE URL
mongodb://127.0.0.1:27017/testdb
##PORT NUMBER
8000
###URL
http://127.0.0.1:8000/

## API's DEVELOPED
### SIGNUP API-1
POST  http://127.0.0.1:8000/signup/
#test-1  First time signup
INPUT 
{
	 "username":"Shivakumar",
	 "email" : "shivakumar@gmail.com",
	 "DOB":"07-04-1996",
	 "password":"Shiv@123"
}
OUPUT
{
    "success": true,
    "message": "Signup successful!"
}
#test-2     If the username already exist
INPUT 
{
	 "username":"Shivakumar",
	 "email" : "shivakumar@gmail.com",
	 "DOB":"07-04-1996",
	 "password":"Shiv@123"
}
OUPUT
{
    "success": false,
    "message": "Username already exist!"
}
#test-3    If the Email already exist
INPUT 
{
	 "username":"Shivakumar1",
	 "email" : "shivakumar@gmail.com",
	 "DOB":"07-04-1996",
	 "password":"Shiv@123"
}
OUPUT
{
    "success": false,
    "message": "Email already exist!"
}

### LOGIN API
POST  http://127.0.0.1:8000/login/
#test-1  Successful login
INPUT
{
	 "username":"Shivakumar",
	 "password":"Shiv@123"
}
OUTPUT
{
    "success": true,
    "message": "Success!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZha3VtYXIiLCJlbWFpbCI6ImJhZGlnZXI4MjVAZ21haWwuY29tIiwiX2lkIjoiNWNiMzZmZWI0Y2I4YzgzNjljMjc3OGZmIiwiaWF0IjoxNTU1MjYzNTI3LCJleHAiOjE1NTUzNDk5Mjd9.09DLZCZ6mALtl02vkbxLHr6mDpi5hbz4bY0FYxxJe4Q"
}
#test-2   If user exist and incorrect password
INPUT
{
	 "username":"Shivakumar",
	 "password":"Shiv@1234"
}
OUTPUT
{
    "success": false,
    "message": "Could not authenticate password"
}
#test-3     If user does not exist
INPUT
{
	 "username":"Shivakumar1",
	 "password":"Shiv@123"
}
OUTPUT
{
    "success": false,
    "message": "Username not found"
}

### TOKEN TO GET LOGGED USER
POST http://127.0.0.1:8000/usertoken/
#test-1    To get user details using token
INPUT
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZha3VtYXIiLCJlbWFpbCI6ImJhZGlnZXI4MjVAZ21haWwuY29tIiwiX2lkIjoiNWNiMzZmZWI0Y2I4YzgzNjljMjc3OGZmIiwiaWF0IjoxNTU1MjYzNTI3LCJleHAiOjE1NTUzNDk5Mjd9.09DLZCZ6mALtl02vkbxLHr6mDpi5hbz4bY0FYxxJe4Q"
}
OUTPUT
{
    "username": "shivakumar",
    "email": "shivakumar@gmail.com",
    "_id": "5cb36feb4cb8c8369c2778ff",
    "iat": 1555263527,
    "exp": 1555349927
}
#test-2 If the JWT token is inavlid
INPUT
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSVtYXIiLCJlbWFpbCI6ImJhZGlnZXI4MjVAZ21haWwuY29tIiwiX2lkIjoiNWNiMzZmZWI0Y2I4YzgzNjljMjc3OGZmIiwiaWF0IjoxNTU1MjYzNTI3LCJleHAiOjE1NTUzNDk5Mjd9.09DLZCZ6mALtl02vkbxLHr6mDpi5hbz4bY0FYxxJe4Q"
}
OUTPUT
{
    "success": false,
    "message": "Token invalid"
}

### PARANTHESIS TO CHECK BALANCED OR UNBALANCED
POST  http://127.0.0.1:8000/expression/
#test-1     To check whether the Paranthesis are Balanced or not in {[] and retun missing }
INPUT
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZha3VtYXIxIiwiZW1haWwiOiJiYWRpZ2VyODI1MUBnbWFpbC5jb20iLCJfaWQiOiI1Y2IwZTlkNWY1YzgyOTM4OGNkZGQyMmEiLCJpYXQiOjE1NTUyNjI5MDgsImV4cCI6MTU1NTM0OTMwOH0.VXxOrCoFyM3ZAuszgjAXChx_CUe5nKK9TegxF9yfi90",
	"expression":"{[]"
}
OUTPUT
{
    "username": "shivakumar",
    "message": "Unbalanced } missing",
    "attempt": 1
}
#test-2  To check whether the Paranthesis are Balanced or not in {[]} and retun Balanced
INPUT
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZha3VtYXIxIiwiZW1haWwiOiJiYWRpZ2VyODI1MUBnbWFpbC5jb20iLCJfaWQiOiI1Y2IwZTlkNWY1YzgyOTM4OGNkZGQyMmEiLCJpYXQiOjE1NTUyNjI5MDgsImV4cCI6MTU1NTM0OTMwOH0.VXxOrCoFyM3ZAuszgjAXChx_CUe5nKK9TegxF9yfi90",
	"expression":"{[]}"
}
OUTPUT
{
    "username": "shivakumar",
    "message": "Balanced",
    "attempt": 2
}
#test-3  To check whether the Paranthesis are Balanced or not in ({]}) and retun missing [
INPUT
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZha3VtYXIxIiwiZW1haWwiOiJiYWRpZ2VyODI1MUBnbWFpbC5jb20iLCJfaWQiOiI1Y2IwZTlkNWY1YzgyOTM4OGNkZGQyMmEiLCJpYXQiOjE1NTUyNjI5MDgsImV4cCI6MTU1NTM0OTMwOH0.VXxOrCoFyM3ZAuszgjAXChx_CUe5nKK9TegxF9yfi90",
	"expression":"({]})"
}
OUTPUT
{
    "username": "shivakumar",
    "message": "Unbalanced [ missing",
    "attempt": 3
}
#test-4   To check whether the Paranthesis are Balanced or not in ({[]}) and retun Balanced
INPUT
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZha3VtYXIxIiwiZW1haWwiOiJiYWRpZ2VyODI1MUBnbWFpbC5jb20iLCJfaWQiOiI1Y2IwZTlkNWY1YzgyOTM4OGNkZGQyMmEiLCJpYXQiOjE1NTUyNjI5MDgsImV4cCI6MTU1NTM0OTMwOH0.VXxOrCoFyM3ZAuszgjAXChx_CUe5nKK9TegxF9yfi90",
	"expression":"({[]})"
}
OUTPUT
{
    "username": "shivakumar",
    "message": "Balanced",
    "attempt": 4
}

### ADMIN API TO GET ALL USERS
#TO PROVIDE ADMIN ROLE PLEASE EDIT "role" FIELD in DATABASE from "user" to "admin"
GET  http://127.0.0.1:8000/admin/
INPUT
#test-1     To provide list of users if the user has admin role
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZha3VtYXIxIiwiZW1haWwiOiJiYWRpZ2VyODI1MUBnbWFpbC5jb20iLCJpYXQiOjE1NTUyNjIzMzcsImV4cCI6MTU1NTM0ODczN30.MUD8FRWu5U6IPjuff4iT6ua3LxwsFN4sTD-svW0DGXA"
}
OUTPUT
{
    "success": true,
    "users": [
        {
            "role": "user",
            "_id": "5cb0e9adf5c829388cddd226",
            "email": "shivakumar@gmail.com",
            "username": "shivakumar",
            "DOB": "1996-07-03T18:30:00.000Z",
            "password": "$2a$10$kzbO/6wuHx7eRTOQpXRcsOMQtuEG85DKS1OzSfwlmHb2F1zPC.0PW",
            "__v": 0
        },
        {
            "role": "admin",
            "_id": "5cb0e9d5f5c829388cddd22a",
            "email": "shivakumar1@gmail.com",
            "username": "shivakumar1",
            "DOB": "1996-07-03T18:30:00.000Z",
            "password": "$2a$10$R1fSI.TsbqBCqCsj7YA9WOiY4OsutDITjDO3YBRj9KkJ2OWYmyely",
            "__v": 0
        }
    ],
    "permission": "admin"
}
#test-2   If the user does not have admin role
INPUT
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZha3VtYXI1IiwiZW1haWwiOiJiYWRpZ2VyODI1NUBnbWFpbC5jb20iLCJfaWQiOiI1Y2IzNzQ5OWUyMjgxMjFjZjgwM2Q2NzUiLCJpYXQiOjE1NTUyNjQ3MTksImV4cCI6MTU1NTM1MTExOX0.U3y6xq6V1wcJ1KfzhKX_vLrbabOx0fKbwZIzw_UhPSc"
}
OUTPUT
{
    "message": "Access Denied!"
}

### API TO DELETE USER IF YOUR ADMIN
DELETE  http://127.0.0.1:8000/userdelete/
#test-1     If the user have admin role and allowing him to delete users
INPUT
{
	"user":"shivakumar1",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZha3VtYXIxIiwiZW1haWwiOiJiYWRpZ2VyODI1MUBnbWFpbC5jb20iLCJfaWQiOiI1Y2IwZTlkNWY1YzgyOTM4OGNkZGQyMmEiLCJpYXQiOjE1NTUyNjMzMjEsImV4cCI6MTU1NTM0OTcyMX0.XUEG1KRfmw6iyomg3JDTXoO5WIlzLYSASF7gHw1Ui-8"
}
OUTPUT
{
    "success": true,
    "message": "Deleted shivakumar1"
}
#test-2     If the user does not have admin role
INPUT
{
    "user":"shivakumar1",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZha3VtYXI1IiwiZW1haWwiOiJiYWRpZ2VyODI1NUBnbWFpbC5jb20iLCJfaWQiOiI1Y2IzNzQ5OWUyMjgxMjFjZjgwM2Q2NzUiLCJpYXQiOjE1NTUyNjQ3MTksImV4cCI6MTU1NTM1MTExOX0.U3y6xq6V1wcJ1KfzhKX_vLrbabOx0fKbwZIzw_UhPSc"
}
OUTPUT
{
    "success": false,
    "message": "Access Denied!"
}
