# CircleContainer

The circle container is used to wrap around a child of either: text or an icon.
This component should be modified by using the props.

## Interaction Requirements

The component may need to accept the behavior of a button. This is achieved by 
using the prop: onClick.
The onClick prop accepts a functions that should implement the needed behavior
for a click event.

## TODO List

Have the CircleContainer conditionally render a div or a button.
If the component recieves onClick as a prop it should render a button.
Otherwise the component should render a div.

## Extra Refactoring:
// pass props onCLick into a function to check and return
Refactor the handleInteraction to do checking inside the method 
{...handleInteraction(props.onClick)}
