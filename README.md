
# Blog App

A Node RESTful API that manages a blog's users, posts, categories & comments.

Technologies Used: Node.js - Nest.js - TypeScript - PostgresSQL - TypeORM.


## Features
- Connect to the Database, Perform CRUD Operations & Create Relationships using TypeORM.
- Create Environment Variables using Config Module.
- Validate Data using Validation Pipes & DTOs.
- Serialize Returned Data using Interceptors & DTOs.
- Authenticate users with JWT & Cookies using Passport JWT Strategy.
- Hash Passwords with bcrypt.
- Authorize Routes with Guards.

## Environment Variables

To run this project, you will need to create a .env file in the root directory of the project

`JWT_SECRET`
`JWT_EXPIRATION_TIME`
`POSTGRES_USER`
`POSTGRES_PASSWORD`
`POSTGRES_DB`
`ADMIN_EMAIL`
`ADMIN_PASSWORD`


## Run Locally

Clone the project

```bash
  git clone https://github.com/Ahmed-Yassen/blog.git
```

Go to the project directory

```bash
  cd blog
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## API Documentation

### **-- Auth Routes --**

#### Create a new user

```http
  POST /api/auth/sign-up/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.  |
| `password` | `string` | **Required**. should be atleast 8 characters. |
| `firstName` | `string` | **Required**.  |
| `lastName` | `string` | **Required**. |

#### Log user in

```http
  POST /api/auth/sign-in
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**.  |
| `password` | `string` | **Required**. |

#### Log user out (*Requires Auth*)

```http
  POST /api/auth/sign-out
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |


### **-- Users Routes --**

#### Get current logged-in user profile (*Requires Auth*)

```http
  GET /api/users/profile
```


#### Change password for current logged-in user (*Requires Auth*)

```http
  POST /api/users/change-password  
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `currentPassword` | `string` | **Required**.|
| `newPassword` | `string` | **Required**.|

#### Remove user account (*Requires Auth & Role: admin*)

```http
  DELETE /api/users/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` | **Required**.  user id|

### **-- Categories Routes --** (*Requires Auth & Role: admin*)

#### Create a category 
```http
  POST /api/categories
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**.  |

#### Get all categories 
```http
  GET /api/categories
```
#### Update a category
```http
  PATCH /api/categories/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` | **Required**.  |
| `name` | `string` | **Required**.  |

#### Remove a category
```http
  DELETE /api/categories/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` | **Required**.  |


### **-- Posts Routes --** (*Requires Auth*)

#### Create a post
```http
  POST /api/posts
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | **Required**.  |
| `content` | `string` | **Required**.  |
| `categories` | `array[{id:number}]` | **Required**. an array that holds objects that contain the category id of each category of the post  |

#### Update a post
```http
  PATCH /api/posts/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` | **Required**.  |
| `content` | `string` | **Optional**.  |
| `title` | `string` | **Optional**.  |
| `categories` | `array[{id:number}]` | **Optional**.  |

#### Remove a post
- Can remove only my posts when role is user
- Can remove any post when role is admin

```http
  DELETE /api/patients/:id 
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` | **Required**.  |

#### Get post by id
```http
  GET /api/posts/find/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` | **Required**. id of the post to find  |


#### Get my posts
```http
  GET /api/posts/my-posts
```
#### Get a user's posts
```http
  GET /api/posts/user/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` | **Required**. id of a user to find their posts  |


#### Get posts in a specific category
```http
  GET /api/posts/category/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` | **Required**. id of the category.  |

#### Get newest posts
```http
  GET /api/posts/newest
```

### **-- Comments Routes --** (*Requires Auth*)

#### Create a comment 
```http
  POST /api/comments
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `content` | `string` | **Required**.|
| `postId` | `number` | **Required**.|

#### Update a comment
```http
  PATCH /api/comments/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` | **Required**.|
| `content` | `string` | **Required**.|

#### Remove a comment
```http
  DELETE /api/comments/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` | **Required**.|

## Feedback

If you have any feedback, please reach out to me at ahmed.ibrahim.yassen@gmail.com
