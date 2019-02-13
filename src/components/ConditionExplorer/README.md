# Condition Explorer

The Condition Explorer is the first component the visitor will see as they enter the page. There are two versions of this component to account for Internet Explorer.

The main version uses physics to animate the interaction between the circle displayed in the window and the bars around it. When a bar comes into contact with the circle, it is displaced proportionally to the speed and direction of contact based on the circle's movement. Bars in movement may collide with one another making them change in direction. Upon contact the displaced bars should also reveal a word which may be selected by the visitor. 

The fallback version uses a different method of interaction whereby a user may turn the bars into words without displacing the bars. Instead, moving the circle around the screen will reveal the bar's word by hovering above it. 

In both versions once the circle is removed from the area where the bar/word came from, said bar will return to its original state. 

## Interaction Requirements

* [ ] Click activates or deactivates the movement of the circle
  * [ ] While movement active dragging the circle applies physics
* [ ] Click on a popped word
* [ ] TODO: Define accessible interaction

## Accessibility Requirements

TODO: Explain desired accessibility support, and provide table of currently
implemented accessibility with table of automated accessibility test results.

## Analytics Requirements

TODO: Explain what analytics events should be fired from this component, and
provide table of currently implemented analytics events with table of automated
analytics test results.

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.

## Examples

TODO: Implement examples of different implementations with sandbox for editing
properties on the fly.
