# Containers

Containers will typically have very little functionality, and will handle a
limited number of tasks:

* Connect Redux state and actions to components
* Handle the layout and interaction of components
* Handle animation when changing views

As with Components, these should always be written in a pure way
(`extends React.PureComponent` or with `React.memo()`)

Containers should be stored in `app/containers/ContainerName/`.

## Folder Structure

Each container should have a folder in `./app/components/`, matching the name
and capitalization of the container component. Each container should have its own
supporting documentation, examples, and tests.

```
/* Inside ./app/containers/ContainerName/
index.jsx // ContainerName as the default export
styles.scss // Styles for ContainerName and children
index.spec.jsx // Test for ContainerName
index.stories.jsx // Examples
README.md // Documentation
```

Unlike `Components`, a `Container` may not have any private components within it.
Any functionality it needs for rendering should be imported from a `Component`.

When importing `ContainerName`, the import should be written as:

```js
import ContainerName from '../containers/ContainerName/';
```

## State

As containers are primarily for layout and connecting data, they should not
have their own state in most cases.

## CSS

Any styles that are required to display the container should be added to a
`styles.scss` file and imported into `index.jsx`.  All declarations within
`styles.scss` should be grouped in a single class that is only used by this
container. These styles may be used to override a component's default styles for
this specific implementation.

```css
/* app/containers/View2/styles.scss */
.View2 {
  .projectMenu .list .active {
    margin-left: 10px;
  }
}
```

## PropTypes

PropTypes should be added to props to reduce bugs in component usage.

## Documentation

Each container should have a `README.md` to explain what components are being
used, and what its interaction, analytics, and accessibility requirements are,
with reference links back to the design document.
