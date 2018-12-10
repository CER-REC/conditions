# Component Name

This component imlements the font-awesome React complonents for SVG icons.
This component will accept the props of:
* size - (using the font-awesome format: https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons)
* color - as a string in HEX or the HTML5 color names
* prefix* -  font awesome has different libraries a prefix is needed for brand icons.
* icon* - this is the name of the specific icon

*To use specfifc icons from the font awesome library you must declare from the import section of the component, then add them to library using the .add() function.

## Interaction Requirements

The `<Icon />` component does not have any interaction functionality

## Accessibility Requirements

TODO: 

## Analytics Requirements

TODO: 

## Unit Testing

* Component|Icon
  * with default props
    * √ should render
    * √ should contain a single child of a FontAwesomeIcon element
  * with default props
    * √ should accept a prop to override the style
    * √ should accept a prop for size
    * √ should accept a prop for a prefix for brand icons
    * √ should accept a prop for color

