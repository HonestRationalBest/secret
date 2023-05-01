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
- `UserContext` is set up in `App`, this means you can access the user ID in any component via this context
- `pages` directory contains the top-level components which form the contents of each page
- `components` directory contains other reusable components
- `layout` contains the main layout for the page including menu bar
- `utils` contains helper functions to perform data fetching

## Backend application

The `backend-application` directory is a placeholder for your new microservice. Please update this section of the read me with instructions on how to run the service.

## Implementation Comments

Please add any comments on choices you have made, any missed functionally or known bugs and what you would improve or do differently given more time if you were to make this solution production-ready.
