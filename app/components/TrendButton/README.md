# TrendButton

The Trend Button is used in View 2, and will open View 3 when clicked. It should
display a preview of the View 3 graph as its background.

## Requirements
* Handles click event 
    * Clicking will direct the user to View3
    * Will change the selectedVisualization from View2 to View3
* Text reflects selected feature from the feature list
* Background image changes based on feature list selection
    * Mini version of the View3 chart
    * If no view3 chart can be rendered, then use the images

## Interaction Requirements

Click, enter, and touch should all call `props.onClick()`

## Accessibility Requirements

* Keyboard interaction
* Screen reader

## Analytics Requirements
* onClick should emit an event with the following properties/labels:
    - Visualization (View/Component):
    - filter (filtered JS)
    - language (type of language)
    - Event (type of interaction)

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.
