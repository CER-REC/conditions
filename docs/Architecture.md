# Architecture

## Components and Containers

We use the terms `Components` and `Containers`, despite both implementing the
React component pattern, so that we can differentiate between reusable elements
and visualization layout elements. Both of these implement a similar pattern,
with the primary difference coming down to testability.

React components should be written as pure components, regardless of whether
they are class or functional components.

```js
class PureClassComponent extends React.PureComponent {}

// If the props or state changing doesn't necessarily trigger a render, we can
// further optimize the component by handling shouldComponentUpdate ourselves.
class ManualPureClassComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (...) { return true; }
    return false;
  }
}

const PureFunctionalComponent = React.memo(props => <div />);
```

Components should be stored in `app/components/ComponentName/` and Containers in
`app/containers/ContainerName/`.

### React Components

Each component that is intended for direct use (as opposed to supporting components
that are only used in a single parent for a very specific purpose) should be in
a folder as the default export from `index.jsx`. This will improve visibility
into which components may be used, and help us ensure that those components do
not have direct dependencies on the state.

```js
// app/components/CompanyWheel/index.jsx
export default class CompanyWheel extends React.PureComponent {}
```

### Containers

Since containers are primarily used for layout and configuration, they will
typically have no (or few) interactable elements. They will serve as the
connection point to the Redux state, providing properties to the components,
including the Redux Action Creators that will be used on the component's
interactive elements.

### State

There are three areas where we may track the current visualization settings:

* Redux (Global application state)
* Component state
* Component properties

As a general rule of thumb, the following steps will define the best location:

* If this data affects the screenshot or sharing: Redux
* If this data is used by multiple components that aren't parents/children of each other: Redux
* If this component or its children should rerender when it changes
 * If this data changes multiple times per second: Potentially property that debounces to state
  * Caution should be used, as this may result in race conditions and render bugs. Always discuss this with the team first
 * If this data changes less than once a second: Component state

When storing state in Redux, a wrapper component should be created with a matching
path to that of the component inside `app/connected/`. This is done to ensure that
the component may be used within design documents without needing a Redux store.

```js
// app/components/CompanyWheel/index.jsx
import React from 'react';
import './styles.scss';
export default class CompanyWheel extends React.PureComponent {}

// app/connected/CompanyWheel/index.jsx
import { connect } from 'react-redux';
import CompanyWheel from '../../components/CompanyWheel/';
export default connect(({ selectedCompany })=> ({ selectedCompany }))(CompanyWheel);
```

### CSS

Any styles that are required to display the component outside of the visualization
should be added to a `styles.scss` file and imported into any files within the
component folder that make use of it. All declarations within `styles.scss`
should be grouped in a single class that is only used by this component.

// TODO Discuss with team and possibly implement a Block Element Modifier (BEM)
// naming convention for classes

```
/* app/components/CompanyWheel/styles.scss */
.company-wheel {
  .company-name {
    font-weight: bold;
  }

  .pull-to-spin {
    position: absolute;
    top: 0;
    right: 0;
  }
}
```

### PropTypes

PropTypes should be added to props to reduce bugs in component usage.

### Documentation

Each component should have a `README.md` to explain what the component is used
for, and what its interaction, analytics, and accessibility requirements are,
with reference links back to the design document.

## Redux

Implementing a global state store with Redux can be broken down into four segments:

* Types: Identifier for what action is being done
* Action Creators: Functions that generate an Action object with the Action Type and the data required to execute the change
* Reducers: Functions that take a current state and an action, and return a new state
* Middleware: Functions that can respond to and prevent actions based on other state

Since Types, Actions, and Reducers are closely related, we group these together
in a single file in the `app/actions/` folder. There should be one file for each
set of related state.

```
// app/actions/findWords.js
export const Types = {
  UPDATE_SEARCH: 'findWords.updateSearch',
  UPDATE_RESULTS: 'findWords.updateResults',
  RESET_SEARCH: 'findWords.resetSearch',
};

export const updateSearchQuery = (newSearch = {}) => ({
  type: Types.UPDATE_SEARCH,
  payload: { query: newSearch },
});

export const updateSearchResults = (searchResults = []) => ({
  type: Types.UPDATE_RESULTS,
  payload: { results: searchResults },
});

export const resetSearch = () => ({
  type: Types.RESET_SEARCH,
});

export const reducer = (initialState = {}, action) => {
  switch (action.type) {
    case Types.UPDATE_SEARCH:
      return { ...initialState, query: action.payload.query };

    case Types.UPDATE_RESULTS:
      return { ...initialState, results: action.payload.results };

    case Types.RESET_SEARCH:
      return { ...initialState, query: {}, results: [] };
  }
};
```

## Testing

Every component should have a set of tests to ensure that it renders as designed
and covers all of the interaction, analytics, and accessibility requirements.

```
// TODO: Write test example and structure
```

