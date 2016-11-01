# Installation
1. run `npm install`
2. Start the project with `npm start`

# Information
## Redux
### Introduction
Redux is based on flux and has as a goal to handle the data in your application in an immutable way and makes this predictable. 
To change this state, an action needs to be fired (we can not edit the state directly, since the store only has a getter for our state)

We can think of our state in redux as a big tree that we update as soon as new data is available. Here new characters are introduced:

* **Action Creators:** These format the action object and return it.
* **The Store:** This takes care of the whole state tree and delegates the work of figuring out what state changes need to happen (Which is done through the reducers). 
The store also takes care of dispatching actions
* **The Reducers:** These tell the store how an action changes the state. The different reducers each manage a separate key, and return the changes to the root reducer.
* **The Views:** There are 2 different views, a smart component and a dumb component
    * **Smart Component:** These are in charge of the actions, dumb components can call actions through callbacks that the smart component provides in the props. They do not have their own CSS styles and rarely emit DOM of their own.
    * **Dumb Component:** These can be reused in a different app since they rely on callbacks. (These also contain the CSS styles.)
* **The View Layer Binding:** This connects the store to the views and introduces 3 concepts:
    * **The Provider Component:** Wrapped around the component tree, it makes it easy for the root component's children to hook up to the store using connect().
    * **connect():** Through this a component can get state updates, the connect function will then set up all the wiring for it using the selector.
    * **selector:** This specifies what parts of the state a component needs as properties.
* **The root component:** This creates the store and tells it which reducers to use (it is the top hierarchy), it also brings together the view layer binding and the views.

### The setup
1. **Create the store**: The root components creates the store and tells it which reducers it should use, using `createStore()`. It assembled the reducers through `combineReducers()`.
2. **Set up communication between the store and the components:** The root component wraps its subcomponents with the provider component and makes the connection between the store and the provider.
3. **Prepare the action callbacks:** To make it easier for dumb components to work with actions, the smart components can setup action callbacks by using `bindActionCreators()`. This automatically passes down a callback to the dumb component.

### How data flows
1. The view creates an action --> The action creator formats it and returns it
2. The action is automatically dispatched (if bindActionCreators() was used), or the view dispatches it
3. The store receives the action and sends the state tree and action to the root reducer.
4. The root reducer cuts apart the tree into slices and passes each slice to the subreducer that deals with it.
5. The subreducer copies the slice and makes changes to the copy, afterwards it returns the copy of the slice to the root reducer.
6. Once all reducers returned, the root reducers combines those together for its new state tree.
7. The store tells the view layer binding that there is a new state
8. The view layer binding asks the store to send over the new state.
9. The view layer binding triggers ar rerender.

> https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207#.g1qn7q8d0
> https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6#.crvplh5lg