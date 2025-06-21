# 📖 Library Management API with Express, TypeScript & MongoDB (via Mongoose)

This is an **`Express.js`** project using **`TypeScript`** for static typing and **`MongoDB`** as the database, integrated via **Mongoose**. Express handles the API routing and middleware, TypeScript ensures type safety and better development experience, while Mongoose provides a structured way to define schemas, interact with the MongoDB database, and handle data validation.

* * *

## 🔑 Key Features
The project includes:
*   Proper schema validation
*   Business logic enforcement (e.g., availability control on borrow)
*   Aggregation pipeline
*   **Mongoose static method**
*   **Mongoose middleware** (`pre`, `post`)
*   Filtering features
*   Generic Error Response/Global Error Handler

* * *

## 🧱 Installation & Setup Process
### CLI Commands :----------
- `npm init --y` 
- `npm i express`
- `npm i -D typescript`
- `tsc --init`
- `npm install mongoose --save`
- `npm i --save-dev @types/express`
- `npm i ts-node-dev -D --save-dev`
- `npm i -D nodemon`
- `npm install dotenv`

### At `tsconfig.json` :----------
```json
"rootDir": "./src/",
"outDir": "./dist/"
...
```

### At `package.json` :----------
```json
"scripts": {
  "start": "node ./dist/server.js",    
  "start:prod": "nodemon ./dist/server.js", 
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "...": "..."
}
```
* * *

## 🧩 API Details
### APIs related to Books :----------
 1. **POST** `/api/books` --- api for creating book
 2. **GET** `/api/books` --- api for getting all books
 3. **GET** `/api/books/:bookId` --- api for getting single book data
 4. **PUT** `/api/book/:bookId` --- api for updating book
 5. **DELETE** `/api/books/:bookId` --- api for deleting book

 ### APIs related to Borrows :----------
 1. **POST** `/api/borrow` --- api for creating borrow 
 2. **GET** `/api/borrow` --- api for getting the brief summary of borrow data