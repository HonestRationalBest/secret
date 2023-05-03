# Secret Escapes Full stack engineer take home task

This project is a starting point for the fullstack engineer technical interview take home task.
It consists of a Frontend (with some functionality already build) and a backend application (to be created by you).

## Frontend application

The frontend application is build using Create react app and is a simple react app using typescript.

### Prerequisites

- Node (version 14+)
- Yarn (modern version)

### To install dependencies

From the `frontend-application` directory and `yarn`

### To start the application

From the `frontend-application` directory run `yarn start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Project overview

- `.env` contains URL for Sparrow graphql API
- `index.tsx` is where the application is set up, including the configuration of Apollo client
- `App.tsx` is the root of the application, and where URL routing is configured
- `pages` directory contains the top-level components which form the contents of each page
- `components` directory contains other reusable components
- `layout` contains the main layout for the page including menu bar
- `utils` contains helper functions to perform data fetching
- `hooks` contains useful hooks that are used in the application to separate logic
- `context` contains context for the user login system and for items throughout the entire application

## Backend application

From the `backend-application` directory run command `npm i` it will install all dependencies

### To start the application

From the `frontend-application` directory run `npm start`

## Implementation Comments

Back-end:
Firstly, i thought between GraphQL and REST API. I like them both, but I decided to choose a GraphQL API because an existing microservice (yours, to handle sales) is already written using this API. I thought that it would better to use one API style in the front-end.

Front-end:
In my implementation, I used the context to store my favorites and made requests everywhere they were needed (on the SaleDetails and SearchResults pages) to save data and update the context. On the Favorites page, I used two queries - the first one from my back-end, and the second one from yours - and saved the results to the context as well. I didn't refactor many of the existing components since the task mentioned that I shouldn't. To separate logic, I used hooks as I consider it a good practice. In general, the project now looks as I expected.

If you have any question feel free to ask me. 
