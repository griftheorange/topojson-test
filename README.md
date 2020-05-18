# TopoGlobe - README

## Concept

The main purpose of this project was a proof-of-concept piece to practice implementation of D3 features/functions in a React setting. D3 typically works by directly adding and appending to elements on the DOM, and I wanted to test out ways to adapt it's functions to React's component-state environment for use in follow-up projects.

I decided to try rendering a globe in React with the D3 library. I wanted to handle all the calculation and projection in D3, and restrict the rendering to React Components. I also wanted to make sure that through React components, I could modularize different parts of the same globe and interact with them individually

The results were a relatively simple collection of code, but I've found it to be a useful reference in follow-up projects for the challenges that come with merging vanilla JS libraries with React and common ways to resolve these conflicts.

## Settup

First clone the library with the following line of code: 


    git clone git@github.com:griftheorange/topojson-test.git


Once the file is cloned, cd into the directory then run: 
- npm install
- npm start

![alt text](./public/document.gif "Logo Title Text 1")

This will boot up a development server of the application. Alternatively, you can run "yarn build" to compile a build version, then run serve -s build. This can take a minute or two to compile the build and is not necessary for a project this size.

Once you're done you should be able to mess around with the project like you see above. The features in this implementation are very basic, but again, they provide a great reference point and are very easy to expand on. As an example, refer to my sm-frontend repo.

## Components

The Component tree for this app is very straightforward:

App -< Canvas -< Globe -< Country

### App

App's only function is to render the canvas

### Canvas

The canvas component is the top level component that holds the state of everything in the app. It's state properties are:

    - mounted: whether or not the component has fully mounted, used to make sure Globe renders after svg canvas
    - globeRotation: stores current rotation of globe
    - selectable: toggles selectability of continents
    - isRotating: toggles rotation of globe on/off
    - lamRotationSpeed: speed of rotation on lambda (normal earth rotation direction)
    - phiRotationSpeed: speed of rotation on phi ("pitch")
    - gamRotationSpeed: speed of rotation on gamm ("roll")
    - clock: holds interval clock object for rotatino ticks
    - scale: holds scale of globe, adjustable

Canvas generates all the state defaults, the forms to alter state, and increments the globe based on any active timers. Once the canvas successfully mounts, the Globe component is called to render next.

### Globe

Globe imports the country features from the local topojson file at /src/resources/world-continents.json, converts them to geoJSON with the 'topojson-client' npm package, and passes them in one-by-one to the Country component.

It also has functions that return D3 path generators based on an orthographic projection. These path generators can be passed geoJSON objects converted from the topojson file and return d attributes that can be applied to React path components. However most of this is handled one level down in the Country Component.

### Country

The project was origionally rendering every country globally, but was changed to continents to reduce lag. The file name has not been changed which is why countries renders continents, but bear with me.

The Country component recieves a translated geoJSON feature as a prop under datum. It also produces the same D3 path generator as the Globe Component, to which it passes the feature to to get a path attribute. The styles and event listeners of the path can be changed in this file, and the path can be made to React to user events. 

For example, I currently have each continent defaulting to a grey color with no border dependent on the component's state. On mouseover, the color state updates to 'orange' visualizing the hover event, and on mouse down the countinent gets a thick grey border. Both of these are removed on mouseout and mouseup respectively.

Also, an onClick listener can be applied to the path that will print out the source feature of the clicked continent, shown in the gif above.

This component is where the main joining of D3 and React occur, and where all the customization and interactability can be produced. Hover events can be updated to display details of the target, clicks can link to other pages or pull up data. Any React effect can be applied even as the globe rotates in real time.

Despite it's simplicity, this provided me with practice and a framework for a great deal of expansion as a future applicaiton feature. Again, if you'd like to see a more developed implementation example, please see my sm-frontend repo for the frontend implementation of my Seismix webpage.

# Default Scripts Provided by Create-React-App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
