# Component Name

This component implements the font-awesome React components for SVG icons.
This component will accept the props of:
* size - (using the font-awesome format: 
https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons)
* color - as a string in HEX or the HTML5 color names
* prefix°° -  font awesome has different libraries a prefix is needed for brand 
icons.
* icon°°- this is the name of the specific icon

°°To use specific icons, you must import the Font-Awesome libraries you need 
and pick the icons you want, then you add them to the library object. Example:
```js
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(
  faTwitter,
  faAngleRight,
); 
```
Icons can be found at https://fontawesome.com/icons?d=gallery&s=solid


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

