## Introduction

- Tired of taking hours to pack before your trip?
- What if there was an easier way?
- Introducting Packing Planner:

1. Upload images of your closet item.
2. Tell us your destination.

Packing planner will look up the weather at your destination and based on your closet items, it will suggest the best packing plan for you.

![Screenshot](./src/images/Screenshot.png)


## Technologies Used

- Full Stack MERN application (MongoDB, Express, React, Node)
- Mongoose
- JWT
- Bcrypt
- JSON
- Token Based Authentication


#### APIs
- Google Places API, Trip destination suggestion and latitude and longitude coordinates
- Weather API, gets 16 day weather forcast at the place
- Cloundinary API, used for cloud storage services for uploaded closet item images
- Clarifai API, clarifai's fashion model uses image recognition to identify what closet item the user uploaded. This can then be used to judge what type of weather it is for.

## Getting started

https://trello.com/b/hevnIBTq/packing-plan

- AAU, Upload a picture of my closet (item) and store it. App classifies it for me.
- AAU, See my closet items.
- AAU, I want to classify my item if I disagree with app.
- AAU, Plan my vacation, my packing. Input place and destination and get what I should pack.
- AAU, I want to see weather at my destination.
- AAU, Sign In/Out.
- AAU, View my previous trips.


## Unsolved Problems

- sometimes authentication fails
- css

## Future

- User can override the item classification. This info can then be sent back to Clarifai to improve the fashion model.
- Add full CRUD for closet items and trips.
- Find API that gives actual picture of the trip destination and display it.
- Improve CSS.
- Improve Machine learning model by incorporating an item identification model before an item recognition model. This way user can take a picture of the entire closet and upload it.
- Incorporate live camera feed.
- Allow user to decide luggage size and incorporate size limit into packing suggestion.



Link: https://packing-plan.herokuapp.com/