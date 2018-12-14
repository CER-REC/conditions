# StreamGraph

The Stream Graph is a public component used in View 3, and will, by default, show all stream
layers from the Sub Feature Legend stacked on top of one another in order, top to bottom, 
from least total conditions to most. 

## Requirements

* [ ] Handles click event
* [X] Text reflects number of Conditions
* [ ] Displays a dynamic title for what the Stream Graph is showing
* [ ] Handles user interaction with the crosshairs

## Data Requirements

* Placeholder for 0 values
* Colour value
* Needs to be ordered from largest to smallest for streams to stack properly

## Interaction Requirements

When an individual category is selected from V3.2 (Small Multiples Legend), the streamgraph 
displays a scaled version of that one stream. The y-axis scales to fit the stream and animated 
transitions are used to show the change.

When animating from all to one stream: The stream selected should animate to the baseline while 
the rest of the streams fade out. After that the streamgraph scales with animation.

When animating from one to all: reverse the above by scaling then changing the basline and fading 
other streams in.

When animation from one to one, if the scale is increasing: animate the scale out to the scale of 
the incoming selection, then fade out the old selection and fade in the new selection.

When animation from one to one, if the scale is decreasing: first fade out the old selection and 
fade in the new selection, then animate the scale to zoom in to the scale of the new selection.

When the user clicks on the stream graph a control appears that will print the exact value for all 
combined themes for each year on the stream graph. The default position of the control is the 
nearest year to the location of the click. The user can drag, arrow or tab across the x-axis, or 
if they click again on the stream graph, the control will move to the nearest location of the new 
click. If the user clicks anywhere off the streamgraph the control disappears. In the default view 
“all themes” the control will display the total number of conditions by year. When individual 
themes are selected the streamgraph will have a similar functionality and the control will display 
the number of conditions by year associated with the selected theme.

## Accessibility Requirements

* Keyboard interaction
* Touch screen interaction
* Screen reader

## Analytics Requirements

* onClick should emit an event
* onTouchEnd should emit an event

## Unit Testing

* Component|Streamgraph
  * with default props
    * √ should render
    * √ should have a classname
    * √ should render a title
    * √ should render a chart
    * √ should render the streams in a stack
    * √ should render the x and y axis
    * √ should round the y value to the nearest whole number
    * √ should round the date label
