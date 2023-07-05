# WIKI-API

## Description

This is a RESTful API built with Node.js and Express.js that provides CRUD operations for managing articles in a MongoDB database. It allows users to create, read, update, and delete articles.

## Installation

1. Clone the repository: `git clone https://github.com/username/repo.git`
2. Change into the project directory: `cd repo`
3. Install the dependencies: `npm install`

## Usage

1. Start the server: `node server.js`
2. Open your web browser and navigate to `http://localhost:3000`

## API Endpoints

### Get All Articles

- URL: `/articles`
- Method: `GET`
- Description: Retrieves all articles from the database.
- Response: An array of articles in JSON format.

### Create an Article

- URL: `/articles`
- Method: `POST`
- Description: Creates a new article in the database.
- Request Body: `{ "title": "Article Title", "content": "Article Content" }`
- Response: The ID of the created article and a success message in JSON format.

### Delete All Articles

- URL: `/articles`
- Method: `DELETE`
- Description: Deletes all articles from the database.
- Response: A success message in JSON format.

### Get an Article by Title

- URL: `/articles/:title`
- Method: `GET`
- Description: Retrieves an article by its title.
- Response: The article with the matching title in JSON format.

### Update an Article by Title (PUT)

- URL: `/articles/:title`
- Method: `PUT`
- Description: Updates an article with the matching title.
- Request Body: `{ "title": "New Title", "content": "New Content" }`
- Response: The ID of the updated article and a success message in JSON format.

### Update an Article by Title (PATCH)

- URL: `/articles/:title`
- Method: `PATCH`
- Description: Partially updates an article with the matching title.
- Request Body: `{ "title": "New Title", "content": "New Content" }`
- Response: The ID of the updated article and a success message in JSON format.

### Delete an Article by Title

- URL: `/articles/:title`
- Method: `DELETE`
- Description: Deletes an article with the matching title.
- Response: The ID of the deleted article and a success message in JSON format.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
