# Collection Management System Data Integration

## Goal
This project aims to develop a backend system that facilitates the integration and management of data collected from various partners. Each partner supplies data in CSV format, which may adhere to different structures. The task is to design and implement a solution that standardizes this disparate data into a unified format suitable for our database schema.

## Collection name: Cases
- **Fields:** Bank name, Property name, City, Borrower name, Created At

## Key Objectives

### Automated Data Import Job
1. **Schedule:**
   - Develop an automated job scheduled daily at 10 AM and 5 PM.
  
2. **Data Source:**
   - Fetch CSV data from a predefined public Google Docs file location.
   - Implement a strategy to read and process the file in chunks and batches efficiently, considering potentially large file sizes.

3. **Database Interaction:**
   - Store the processed data in our MongoDB database according to our established schema.

### Error Handling and Logging
1. **Error Handling:**
   - Implement comprehensive error handling to catch and log any issues during the data import process.

2. **Logging:**
   - Include detailed logging to monitor the job's progress.
   - Please make sure that any operational issues can be quickly identified and resolved.

### Data Aggregation API
1. **API Endpoint:**
   - Create an API endpoint that provides aggregated data from the Cases collection.

2. **Aggregated Fields:**
   - Allow querying the total number of cases by city.
   - Provide the capability to filter results based on a specified date range.

## Technical Specifications

### Architecture
- Follow a modular approach to structure the code.
- Separate concerns into routes, controllers, and models.

### Database
- Use Mongoose for MongoDB interactions.

### Language
- Implement the solution using JavaScript.


## Steps to run the application

- Set up MongoDB locally and then run the application with the command `node app.js`
- The application runs on the port 8080 
- Visit [Health Check](http://localhost:8080/) to check the health of the application
- Check  out the [API documentation](https://documenter.getpostman.com/view/19565479/2sA2r3ZktY)

## Deliverables

- Developed an automated job scheduled daily at 10 AM and 5 PM
- Fetched CSV data from a local CSV file (path: `src/assets/files`).
- Implemented a strategy to read and process the file in chunks and batches efficiently, considering potentially large file sizes.
- Stored the processed data in our MongoDB database according to our established schema.
- Implemented comprehensive error handling to catch and log any issues during the data import process.
- Included detailed logging to monitor the job's progress.
- Created an API endpoint that provides aggregated data from the Cases collection.
- Allowed querying the total number of cases by city.
- Provided the capability to filter results based on a specified date range.
- Followed a modular approach to structure the code.
- Separated concerns into routes, controllers, and models.
- Used Mongoose for MongoDB interactions.
- Implemented the solution using JavaScript.
