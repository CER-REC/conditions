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

|Categories|Test Details|
|without a selectedFeature|should not render anything|
|with a selectedFeature|should render a button|
|with a selectedFeature|should render a div with a className of trendButton|
|with a selectedFeature|should render a div with a className of buttonText|
|with a selectedFeature|should render a span for button text|
|when a trendButton is clicked|should call it's onChange prop|
|when a trendButton is clicked|should call it's onChange prop when enter is pressed|
|if streamGraph available|renders StreamGraph component correctly|
|if streamGraph available|renders a div with a className of streamGraphBackground|
|if streamGraph not available|renders a div with a className of staticBackground|
|if streamGraph not available|renders an image tag|
|if streamGraph not available and Instrument is selected|has image source of BubbleButton|
|if streamGraph not available and anything other than Instrument is selected|has image source of StreamButton|

* Code Coverage Metrics:
    - 100% Coverage (Statements, Branches, Functions, Lines)