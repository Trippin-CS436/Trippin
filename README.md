## Project Description
A personal Itinerary Tracking Web Application designed for your own needs! Planning your Trip, keeping your itinerary, get information for the locations you want to visit are easy as ever! Your personal trip planner also comes with cool features such as sharing your personalized itinerary with your friends on social media.

## Requirements
1. :white_check_mark: Completed
2. :soon: Working In Progress
3. :negative_squared_cross_mark: Partially completed
### Minimum requirements:
1. :white_check_mark: Implement a comprehensive list of countries/cities where users can checkbox places they have visited, and a list of user’s intended traveling places. 
2. :white_check_mark: A trip itinerary should allow for multiple countries, each with multiple cities with no duplicates. (although there might be a limit to how many we can accommodate for each itinerary file)
3. :white_check_mark: When setting up the itinerary, allow specific date ranges of each city for day to day planning, or no dates for more leisure/wishlist itinerary
4. :white_check_mark: Should allow for multiple date ranges in the same city in case one travels back and forth between cities. Make sure date ranges don’t collide (covers duplicate city visit in 2)
5. :white_check_mark: At the end of trips with specified date range, trip is can be archived, and list of places visited is updated with user permission.
6. :white_check_mark: Add and remove functionality. Should be able to add and remove an entry from an itinerary as well as add to or delete an existing trip itinerary.

### Standard requirements:
1. :white_check_mark: Allow for user account sign up (ideally allow third-party account authentication eg. Gmail, Facebook)
2. :white_check_mark: On each location entry, have a note section and/or photo attachment functionality - this note/photo section can be edited at any time before, during, and after your trip.
3. :white_check_mark: Have a Google Map interface to search up locations. Once search is successful, add location to itinerary list. Automatically add available information - address, rating, opening hours, website
4. :white_check_mark: Also allows for manual entry of location and edit Google-automated entries as information could be incorrect/unavailable
5. :white_check_mark: Set up social media sharing functionality for past/future itinerary
6. :white_check_mark: End of trip: checkbox function for places you'd want to return to or haven’t been to. Next time you plan a trip in the same city, the checkboxed location should show up as recommendations.

### Stretch requirements: 
1. :soon: Given a starting point and list of places to visit in a day, find the most efficient path of visit time-wise (taking in directions/traffic as provided by Google Maps)
2. :negative_squared_cross_mark: Automatically detect GPS signal and update visited list with user permission
3. :soon: Generate directions between adjacent location entries
4. :soon: Add location tagging that allows the user to find a place to visit in a given location from a selected tag. Users can select and add a place to their itinerary. Using Google Map Places API, use the place type as the tag to find places with the matching tag from a given location. 

## Tech Usage 
1. HTML,CSS,JS <br />
    * We use CSS in combination with Material UI to style our pages. The Cascading effect whilst difficult to manage in the beginning, provides much ease in consistent styling of components. Media query also provides a very quick and easy method to adapt rendering to mobile view. We also use SCSS for looped components with transtions, which simplifies the work flow of maintaining our stylesheets. <br />
2. React & Redux <br />
    * We used React to model our website with different routing for different components, which makes division of work clearer and easier. Futhermore, Components are easily reusable and integrates HTML and Javacript through JSX, which is much easier to work with compared to pure HTML. Furthermore, suites of easily accessible packages such as Material UI and npm-react components simplify tasks needed for this project. We also use Redux to store all communicated fields between Components. This is essential to our project as new Map fields need to trigger re-rendering, and communication between Map and rendered components is needed within various contexts, which would be extremely difficult to implement through props inheritance alone and may require far more coupling that could cause vulnarabilities. <br />
3. Mongo DB <br />
    * NoSQL (document-based) DataBase utilized to store user end's data such as user's itinerary, information, profile pictures. The advantage of using MongoDB is that it has dynamic schemas for unstructured data, it offered much greater flexibility in terms of the types of data we stored.
4. Node & Express <br />
    * Express was used to set up the backend node server because it is a fast, "unopinionated minimalist web framework for Node.js". The advantage of express over Node.js is that it is faster to code in and has more features, in addition, express takes repetitive low level code and offers a higher level API to use.
5. Release Engineering (Heroku) <br />
    * Deployed our application using Heroku. Heroku allows developers to focus more on code instead of infrastructure when compared to other deployment services

## Above & Beyond Course Scope
Our import photos and pdf functionality allows users to store their files into the itinerary. In developing this feature, we had to implement encoding and decoding of the files that we generate using Dropzone.JS which we used to import the files. Once an array of files are uploaded, for pdf or photos, we encode the files to base64  for storing into the database where we limited the express request size to 500mb for an itinerary. We allow multiple user imports for up to 100mb and we used material ui icons to generate the icon for previewing the file type on import.  This allows users to distinguish their file type and prevents adding user incorrect files. For displaying the pdf, once the user clicks the file, we encode the file to base64 and it generates a new window for displaying the user pdf.

## Next Steps
1. Integrate more functionalities into the GoogleMap (Stretch Requirement #1,3), ideally mimic most of the functions that users can achieve using official google map.
2. Add more features like location tagging (Stretch Requirement #4), Integrate community interaction into archived Trip Section (Instagram, Upvote feature), web page footer.
3. Ship out IOS/Android Version of the App
    

## List Of Contributions (Ordered by alphabet)
- Leann f5a2b<br />
    * Contributed mainly on functionality of itinerary - generating location information from Google Maps, adding user notes, sharing itinerary, uploading pdfs and photos to itinerary and saving into database, display and functionality for Archive and Browse Itinerary Page, adding itineraries to user's archive and publically sharing an itinerary. <br />
    *  Contributed partially on: CSS styling, implementing data structure. <br />
- Linh c1q0b<br />
    * Contributed mainly on Frontend UI design and implementation for both laptop and mobile view, setup of User Authentication with Google and Facebook, Redux/router/MongoDB for User object.  <br />
    * Contributed partially on Social Media Sharing Page/Functionality, copying/repeating of Archived trips or Public trips <br />
- Jacky i0k0b<br />
    * Contributed mainly on: Google Map Component, Social Media Sharing Page/Functionality, BackEnd/MongoDB SetUp, Avatar Image Handling. <br />
    * Contributed partially on: CSS styling, deployment on Heroku.<br/>
- Josh e8m2b<br />
    * Contributed mainly on: itinerary's expandable list, date selection UI and validation, adding + saving itinerary functionality. <br />
    * Contributed partially on: CSS styling, deployment onto heroku, implementation of various backend endpoints <br />


# Code References

## mapInfo information display
- https://material-ui.com/components/rating/#SimpleRating.js

## grid photo components
- https://material-ui.com/components/grid-list/#SingleLineGridList.js

## react dropzone
- https://www.npmjs.com/package/material-ui-dropzone

## carousel styling in ArchiveItineraries
- https://www.youtube.com/watch?v=3ax9TW2c2bY

## pdf view component
- https://www.npmjs.com/package/react-pdf
- https://ourcodeworld.com/articles/read/682/what-does-the-not-allowed-to-navigate-top-frame-to-data-url-javascript-exception-means-in-google-chrome

## google Map
- https://www.youtube.com/watch?v=Alz13kGluL8&t=2446s