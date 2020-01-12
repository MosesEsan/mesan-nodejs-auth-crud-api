# Node.js API: CRUD operations with Pagination, Filtering, Grouping and Sorting capabilities.

Node.js REST API with CRUD and Aggregation operations including Pagination, Filtering, Grouping, Sorting and Partial Text Search.

### This Branch
CRUD Operations (Event)

### Other Branch
[Node.js Authentication API with Email Verification](https://github.com/MosesEsan/mesan-nodejs-auth-crud-api)

[Node.js Authentication API with No Email Verification](https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/tree/auth_no_verification)

### Tutorial
Tutorial available [here](https://medium.com/better-programming/node-js-api-add-crud-operations-with-pagination-filtering-grouping-and-sorting-capabilities-55375ad0b774)

## API Documentation

### Request parameters

* q -  Keywords or phrases to search for in the event name - Performs Partial Text Search.
* date - Retireve all events for the specified date. Format: YYYY-MM-DD (e.g. 2020-01-08) 
* sort_order - The order to sort the events in. Possible options: asc, desc. Default: asc
* limit (int)- The number of results to return per page. Default: 5
* page (int) - Use to page through the results.

### Response object
* totalResults(int) - The total number of results available for the request.
* limit(int) - The limit used
* page(int) - The current page number
* totalPages(int) - The total number of pages available
* hasPrevPage(boolean) - Indicates if there is a previous page
* hasPrevPage(boolean) - Indicates if there is a next page
* prevPage(int) - The previous page in the resultset
* nextPage(int) - The next page in the resultset
* events (array)- The events grouped by date. Contains JSON objects with an _id and data key.

#### events
* _id(date) - The event date
* data (array)- The events for this date. Contains JSON objects

##### data
* userId - The identifier id for the user that created the event.
* name(string) - The name of the event
* location(string) - The location of the
* address(string) - The location of the event
* start_date(string) - The start date and time of the event
* end_date (string) - The end date and time of the event
* description(string) - A description or snippet from the article.
* image (string) - The URL to a image for the event.
* createdAt (string) - The date and time that the event was added.

## Testing
Use <a href="https://www.getpostman.com" target="_blank">Postman</a> to test.<br/>

**Seed Database**

Populate the database with some fake data by accessing the seed endpoint. /api/event/seed . Make sure you have logged in as this endpoint requires an authentication token.

Create a GET request to /api/event/seed <br/>

![Seed Database](https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/blob/crud-events/demo/event/SeedDatabase.gif "Seed Database")

----

**Pagination and Sorting**

Create GET requests

1. Get all events [default limit is 5]
http://localhost:3000/api/event

2. Page through the results
http://localhost:3000/api/event?page=2

3. Get all events in descending order
http://localhost:3000/api/event?sort_order=desc

4. Get all events with a limit of 10
http://localhost:3000/api/event?limit=10

![Pagination and Sorting](https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/blob/crud-events/demo/event/PaginationAndSorting.gif "Pagination and Sorting")

----

**Filtering and Grouping**

Create GET requests

1. Search for an event
http://localhost:3000/api/event?q=[search_text]

2. Get all the events for a particular date - Grouped
http://localhost:3000/api/event?date=2020-07-07

3. Get all the events for a particular date - Without Grouping
http://localhost:3000/api/event?date=2020-07-07&group=0

4. Get all the events without Grouping
http://localhost:3000/api/event?group=false

![Filtering and Grouping](https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/blob/crud-events/demo/event/FilteringandGrouping.gif "Filtering and Grouping")

----

**Create, Read and Update**

1. Create an event [POST]
http://localhost:3000/api/event

2. Read an event [GET]
http://localhost:3000/api/event

3. Update the event [PUT]
http://localhost:3000/api/event

Attempt to update an event that doesn't belong to you. Should receive an error message.
{
    "message": "Event does not exist"
}

![Create, Read and Update](https://github.com/MosesEsan/mesan-nodejs-auth-crud-api/blob/crud-events/demo/event/CreateReadUpdate.gif "Create, Read and Update")

----
