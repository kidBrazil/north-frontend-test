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

### Populating DB
It is highly recommended that you use the Create Event form to populate the Database. Otherwise you will run into errors because the schema might not match.

### Theming
There are a few variables that can be changed on the `src/assets/styles/variables.scss` file that will change the whole look of the application. You can change the size of the sidebar, the main color of the application and the base font-size. This could easily be turned into JS functions.

```scss
/*-------------------------------------
 * VARIABLES - PROJECT WIDE
/-------------------------------------*/

// Main colors
$color-brand-primary: #e27c13;
$color-brand-accent: #c4ee1e;
$color-brand-delete: #e23013;
$color-brand-submit: #50e213;
$bkg-dark-grey: #191919;
$bkg-medium-grey: lighten($bkg-dark-grey, 15%);
$bkg-light-grey: lighten($bkg-medium-grey, 30%);
$color-brand-bkg: lighten($bkg-dark-grey, 10%);
$black: #000;
$white: #fff;

// Main Font
$main-font: 'Roboto', 'Helvetica', sans-serif;
$heading-weight: 700;
$subheading-weight: 500;
$body-weight: 300;
$base-font-size: 16px;

// Sizing Variables
@function calc-percent($target, $container) {
  @return ($target - $container);
}
// Buttons
$standard-button-padding: 15px 20px;
// Set size of sidebar here
$sidebar-width: 25%;
$main-width: calc-percent(100%, $sidebar-width);
// Radius Variables
$standard-radius: 10px;

```

-------

## [Project Assumptions]
My interpretation of the project is that we were dealing with a UI for a ficticious service company that provides a variety of support services for businesses and offices. I would imagine you would call or email these guys and ask for help with networking, complain about problems in the office building or ask for technical assistance over the phone.

Based on that interpretation I assumed that the UI would serve as the central control point for the service company. Dispatchers and technicians would be able to go to this UI and see any service requests (events) that are available in the system. They could then view details on that request, delete it once completed or create new ones.

## [DATA STRUCTURES]
The application expects a few specific types of data for fields such as Icon and ServiceId. These are in turn used to return the right graphics and the correct filtering results. Because of this it is recommended that you use the Create Event form to populate the Database for testing.

## [PROJECT NOTES]

### Shortcomings with React
It has been quite a few years since I last had to use React in a production capacity so I am a bit rusty. There have also been quite a few changes to how React does things over the years. For those reasons I am sure I might have engaged on some anti-patterns here because I am basically learning as I do this test. I would be happy to correct any of those and welcome any opportunity to learn more about the framework.

Some of the things I would have liked to do better with this application:
- Improve Error handling to mark the fields that have error visually
- More granular breakdown of components
- Global shared functions
- i18N Internationalization - This is quite easy to do on Vue.js but seemed like a big time commitment for React.
- Add image compression pipeline with Webpack - I opted not to do this at this time because the application is not handling any images. I do have examples of such pipelines in my Github.
- Implement Linting

### Icons as FontAwesome instances:
I realize that the prompt asks for a URL that points to a icon somewhere. I could have easily done something like that by supplying SVG's to the application as assets, importing them and saving the path to be used on the forms.

My decision to go with a FontAwesome approach is mostly aesthetic. The end result of using a font is much greater control over the themeing of the application. With Fontawesome pro you can upload your own custom SVG's as a font and use those as well.

In my mind it would make more sense to use the URL for something like an image uploader which would require a Node.js backend with storage.

I strongly believe this solution is equivalent to what I would have produced using an image URL except the source of the string and what it points to is font-awesome.

### Form validation
Because so little information was given on the schema other than the fact that pretty much every field is a string it makes it difficult to validate. Typically if we have known data structures for things like ServiceID and TimeStamp I could validate using regEx against a given pattern.

Without that information I opted for doing a simple one step validation that pretty much just checks that the fields have inputs.


## [ TODO's ]
- Refactor SCSS to consolidate styles
- Add Favicon generator
- Dockerize React App
