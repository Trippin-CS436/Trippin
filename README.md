# Trippin

## Project Description

Our app is a personal travel planner. It will have 3 main functions: planning for future trip itinerary, archiving old trips with notes/photos for future reference, and keeping a check list of places one has been to. For the first function, we wish to provide a Google Map interface where you can search for places you want to visit and add it to your itinerary list. Each location entry will then have auto-populated info such as address/opening hours/rating etc. which is then stored in the database (and hopefully also locally for limited offline functionality on mobile app) so you don’t need to re-search the info each time. The entries will also have a note section for you to keep track of all information such as reservation numbers/things you’d want to revisit etc. A stretch goal is to then design an algorithm to figure out the most efficient way to go about places in terms of traffic/time etc. Once the trip is over, it will be archived for future reference when planning a trip to the same city as per our 2nd functionality. For our 3rd functionality, the app will also store a list of all places you have been to - every country (and city if you wish to declare). Once a trip is over, the list is automatically updated. If time allows for it, we would also like to set up itinerary sharing functionality.

## Requirements

### Minimum requirements:
1. Implement a comprehensive list of countries/cities where users can checkbox places they have visited, and a list of user’s intended traveling places. 
2. A trip itinerary should allow for multiple countries, each with multiple cities with no duplicates. (although there might be a limit to how many we can accommodate for each itinerary file)
3. When setting up the itinerary, allow for 2 options of setting up specific date range of each city for day to day planning, or no dates for more leisure/wishlist itinerary
4. Should allow for multiple date ranges in the same city in case one travels back and forth between cities. Make sure date ranges don’t collide (covers duplicate city visit in 2)
5. At the end of trips with specified date range, trip is automatically archived, and list of places visited is updated with user permission.

### Standard requirements:
1. Have warning messages when adding a location entry in a different city than specified by the user.
2. For trips with specific dates, have date entries for each day of the trip and allow for dragging location entries into different dates.
3. On each location entry, have a note section and/or photo attachment functionality - this note/photo section can be edited at any time before, during, and after your trip.
4. Have a Google Map interface to search up locations. Once search is successful, add location to itinerary list. Automatically add available information - address, rating, opening hours, website
5. Also allows for manual entry of location and edit Google-automated entries as information could be incorrect/unavailable
Set up social media sharing functionality for past/future itinerary
6. End of trip: checkbox function for places you'd want to return to or haven’t been to. Next time you plan a trip in the same city, the checkboxed location should show up as recommendations.
7. Allow for user account sign up (ideally allow third-party account authentication eg. Gmail, Facebook)

## Draft Mockup UI
Adding locations to a trip itinerary

<img src="https://github.com/jrayo00/Trippin/blob/master/Screen%20Shot%202020-05-23%20at%201.55.27%20AM.png" alt="alt text" width="600" height="400">

Expanded content of each location entry

<img src="https://github.com/jrayo00/Trippin/blob/master/Screen%20Shot%202020-05-23%20at%201.52.09%20AM.png" alt="alt text" width="600" height="400">

