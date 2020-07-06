# bygo

bygo is a simple checklisting app to help users organize the things they need to pack before they leave the house.

![bygo](/assets/bygo.png)
[Video Demo](https://youtu.be/EUud819iFZk)

## Motivation

I built this app due to my constant lack of organization. I always forget at least two things when packing.. even when going to a regular place. I'm sure this is a problem shared by many so I hope that this app can help others.

## Technology

* React Native
* Expo Library
* AWS Amplify
  * DynamoDB
  * GraphQL
* Recoil JS

## Features

#### My Lists page

* Users can creat clean, orgainized lists
* Users can find a specific list using the search bar

![My Lists](/assets/myList.png)

#### List Page

* Users can add / removes items
* The items are automatically assigned a category based on user input
* Users can click on the bag tab to see items which have been checked off the list
* From the bag tab, users can remove items from the bag or empty the entire bag
* Once all the items have been checked off the list, the user will be redirected to the My List Page and the items will be added back to the list for later use

![List](/assets/ListPage.png)

## Installation

Make sure you have [npm installed](https://www.npmjs.com/get-npm) on your local machine.

* Clone this repository
* Navigate to the directory and run `<npm i>`
* Run `<npm start>`


## Credits

**Project Manager / Software Engineer**<br />
[Robert Collins](https://www.linkedin.com/in/rpc219/)

**UX Designer**<br />
[Sam Jaklich](https://samjaklich.com/)

**Colaborators**<br />
[Buford Eeds](https://www.linkedin.com/in/bufordeeds/)
<br />
[Adam Age](https://www.linkedin.com/in/errorsyntax/)

*Special thanks to all the Flatiron staff who helped me along the way*

