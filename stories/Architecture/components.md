# Components

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

Components should be stored in `app/components/ComponentName/`.

## Public vs Internal components

Although all components can be used, we differentiate between public and internal
components by their folder structure and exports. This allows for a cleaner
folder structure and division of responsibilities for our components. If a
component is meant to be used by a view, or is used by multiple other components,
it should be considered a `public` component. Anything else can be considered an
`internal` component and should be placed inside of the `public` component that
uses it.

## Folder Structure

Each `public` component should have a folder in `./app/components/`, matching the name
and capitalization of the component. Each component should have its own supporting
documentation, examples, and tests.

```
/* Inside ./app/components/MyPublicComponent/ */
index.jsx // MyPublicComponent as the default export
styles.scss // Styles for MyPublicComponent and children
index.spec.jsx // Test for MyPublicComponent
index.stories.jsx // Examples
README.md // Documentation
PrivateComponent.jsx // Component used only within MyPublicComponent
PrivateComponent.stories.jsx // Examples
PrivateComponent.README.md // Documentation
PrivateComponent.test.jsx // Test for PrivateComponent
```

When importing `MyPublicComponent`, the import should be written as:

```js
import MyPublicComponent from '../components/MyPublicComponent/';
```

## State

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

When a component needs state that is stored within Redux, it will be passed in
as props from the parent component (in most cases this will be a View).

## CSS

Any styles that are required to display the component outside of the visualization
should be added to a `styles.scss` file and imported into any files within the
component folder that make use of it. All declarations within `styles.scss`
should be grouped in a single class that is only used by this component.

```css
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

## PropTypes

PropTypes should be added to props to reduce bugs in component usage.

## Documentation

Each component should have a `README.md` to explain what the component is used
for, and what its interaction, analytics, and accessibility requirements are,
with reference links back to the design document.
