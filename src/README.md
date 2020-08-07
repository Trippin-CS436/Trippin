## Project Description
- A personal Itinerary Tracking Web Application designed for your own needs! Planning your Trip, keeping your itinerary, get information for the locations you want to visit are easy as ever! Your personal trip planner also comes with cool features such as sharing your personalized itinerary with your friends on social media.

## Requirements
1. :white_check_mark: Completed
2. :soon: Working In Progress
3. :negative_squared_cross_mark: Partially completed
### Minimum requirements:
1. :white_check_mark: Implement a comprehensive list of countries/cities where users can checkbox places they have visited, and a list of user’s intended traveling places. 
2. :white_check_mark: A trip itinerary should allow for multiple countries, each with multiple cities with no duplicates. (although there might be a limit to how many we can accommodate for each itinerary file)
3. :white_check_mark: When setting up the itinerary, allow for 2 options of setting up specific date range of each city for day to day planning, or no dates for more leisure/wishlist itinerary
4. :white_check_mark: Should allow for multiple date ranges in the same city in case one travels back and forth between cities. Make sure date ranges don’t collide (covers duplicate city visit in 2)
5. :white_check_mark: At the end of trips with specified date range, trip is automatically archived, and list of places visited is updated with user permission.
6. :white_check_mark: Add and remove functionality. Should be able to add and remove an entry from an itinerary as well as add to or delete an existing trip itinerary.

### Standard requirements:
1. :white_check_mark: For trips with specific dates, have date entries for each day of the trip and allow for dragging location entries into different dates.
2. :white_check_mark: On each location entry, have a note section and/or photo attachment functionality - this note/photo section can be edited at any time before, during, and after your trip.
3. :white_check_mark: Have a Google Map interface to search up locations. Once search is successful, add location to itinerary list. Automatically add available information - address, rating, opening hours, website
4. :white_check_mark: Also allows for manual entry of location and edit Google-automated entries as information could be incorrect/unavailable
5. :white_check_mark: Set up social media sharing functionality for past/future itinerary
6. :white_check_mark: End of trip: checkbox function for places you'd want to return to or haven’t been to. Next time you plan a trip in the same city, the checkboxed location should show up as recommendations.
7. :white_check_mark: Allow for user account sign up (ideally allow third-party account authentication eg. Gmail, Facebook)

### Stretch requirements: 
1. :soon: Given a starting point and list of places to visit in a day, find the most efficient path of visit time-wise (taking in directions/traffic as provided by Google Maps)
2. :negative_squared_cross_mark: Automatically detect GPS signal and update visited list with user permission
3. :soon: Generate directions between adjacent location entries
4. :soon: Add location tagging that allows the user to find a place to visit in a given location from a selected tag. Users can select and add a place to their itinerary. Using Google Map Places API, use the place type as the tag to find places with the matching tag from a given location. 

## Tech Usage 
1. HTML,CSS,JS <br />
2. React & Redux <br />
3. Mongo DB <br />
   NoSQL (document-based) DataBase utilized to store user end's data such as user's itinerary, information. The advantage of using MongoDB is that it has dynamic schemas for unstructured data.  
4. Node & Express <br />
5. Release Engineering (Heroku) <br />

## Above & Beyond Course Scope


## Next Steps
1. Integrate more functionalities into the GoogleMap (Stretch Requirement #1,3), ideally mimic most of the functions the user can achieve on the real google map.
2. Add more feature like location tagging (Stretch Requirement #4), Integrate community interaction into archived Trip Section (Instagram Like), Reddit-Like Section for users postings.
3. Ship out IOS/Android Version of the App
    

## List Of Contributions (Ordered by alphabet)
- Leann f5a2b<br />
- Lin c1q0b<br />
- Jacky i0k0b<br />
    Contributed mainly on: Google Map Component, Social Media Sharing Page/Functionality, BackEnd/MongoDB SetUp, Avatar Image Handling. <br />
    Contributed partially on: CSS styling, deployment on Heroku.<br/>
- Josh e8m2b<br />
Contributed mainly on: itinerary's expandable list, date selection UI and validation, adding + saving itinerary functionality. <br />
Contributed partially on: CSS styling, deployment onto heroku, implementation of various backend endpoints


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