# [NORTH Front End Test ]
Repository for the Ract.js front-end test for North. The objective of the test is to develop a React.js solution to interact with a Heroku hosted API. The API consists of a simple repeater that will store anything you send it for a period of time. For the purposes of this test a schema has been given.

The UI must retrieve the data from the API and display it as indicated in the test prompt.

---------

## [Running Locally]
Running the project locally will require that you have Node.js installed on your machine in order to run React.js and the Webpack dev server. If you don't have Node.js installed please see the [Installation Instructions.](https://nodejs.org/en/)

### Download and extract repository.
Download the repository as a ZIP or if you have Git installed and configured on your machine feel free to clone the repository directly.

### Install dependencies & Run server
In your terminal of choice, navigate to the folder containing the project `nort-frontend-test/client`.

```bash
# Install dependencies
npm install

# Run Dev Server
npm run start

# Run Build service
npm run build
```

-------

## [Project Assumptions]
My interpretation of the project is that we were dealing with a UI for a ficticious service company that provides a variety of support services for businesses and offices. I would imagine you would call or email these guys and ask for help with networking, complain about problems in the office building or ask for technical assistance over the phone.

Based on that interpretation I assumed that the UI would serve as the central control point for the service company. Dispatchers and technicians would be able to go to this UI and see any service requests (events) that are available in the system. They could then view details on that request, delete it once completed or create new ones.


## [ TODO's ]
- Locallization
- Refactor SCSS to consolidate styles
- Add Favicon generator
- Add Image compression Pipeline
- Dockerize React App
