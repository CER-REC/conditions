# CircleContainer

The circle contatiner is used to wrap around a child of either: text or an icon.
This component should be modified by using the props of: onClick, size, elevated, and disabled.
The size prop is required beause the singular value applies for both the height and width for the border-radius CSS style to render properly.

The icon passed as a child should make use of the public "Icon" component. 


## Interaction Requirements

The component may need to accept the behaviour of a button. This is acheived by using the prop: onClick.
The onClick prop accepts a functions that should implement the needed behavior for a click event.

## Accessibility Requirements

TODO: Explain desired accessibility support, and provide table of currently
implemented accessibility with table of automated accessibility test results.

## Analytics Requirements

TODO: Explain what analytics events should be fired from this component, and
provide table of currently implemented analytics events with table of automated
analytics test results.

## Unit Testing

 Component|CircleContainer
    with default props
      √ should render
      √ should render the children
      √ should have an CircleContainer class
    Component renders with passed props
      √ should render the "CircleContainer" class and an extra class through the "elevated" prop
      √ should render the "CircleContainer" class and an extra class through the "disabled" prop
      √ should accept a size prop with a width and height
      √ should check that the prop "onClick" by default doesnt exist
      √ should check the "onClick" prop accepted a function then used the spread operator

##Extra Refactorings:
Refactor the handleInteraction to do checking inside the method  // pass porps onCLick into a function to check and return {...handleInteraction(props.onClick)}
