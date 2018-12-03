# StreamGraph

The Stream Graph is a public component used in View 3, and will, by default, show all stream layers from the Sub Feature Legend stacked on top of one another in order, top to bottom, from least total conditions to most. Dashed guidelines will indicate more precision for the user and a knob will show where the user has clicked on the selected stream layer. A textbox displaying the number of conditions will render at the top of the vertical crosshair.

## Requirements

* Handles click event
* Text reflects number of Conditions
* Stream graph should update to show the stream layer selected
* Displays a dynamic title for what the Stream Graph is showing
* Handles user interaction with the crosshairs

## Data Requirements

* Placeholder for 0 values
* Colour value
* Needs to be ordered from largest to smallest for streams to stack properly

## Interaction Requirements

** Stream graph interactions are still pending full approval from the NEB

When an individual list item is selected from the Sub Feature Legend, the stream graph should display a scaled version of that one stream layer.

When animating from all to one stream: the stream layer selected should animate to the baseline while the rest of the streams fade out. After that, the stream graph scales with animation.

When animating from one to all: reverse the above by scaling then changing the baseline and fading other stream layers in.

When animating from one to one if the scale is increasing: animate the scale out to the scale of the incoming selection, then fade out the selection and fade in the new selection.

When animating from one to one if the scale is decreasing: first fade out the old selection and fade in the new selection, then animate the scale to zoom in to the scale of the new selection.

Animations for the stream layers should use a cubic ease in/out curve to the time of 1 or 2 seconds.

When the user hovers (by touch or hold) over a section of the stream graph, it also highlights the area with an outline and displays the number of conditions that stream layer has in that year (whichever year is closest to the point where the user has hovered over). Every other stream layer in that graph and in the legend is set to 0.2 opacity as well. There are also dashed guidelines that appear to indicate more precision for the user.

A similar effect occurs for hover even when a single stream layer is selected as well.

** For touch users, instead of hovering over sections, the user can also drag the knob on the stream graph to different stream layers to read specific values. The value given will be whichever year and stream layer is closest to where the knob is (and visually it will appear to snap to the exact points).

## Accessibility Requirements

* Keyboard interaction
* Touch screen interaction
* Screen reader

## Analytics Requirements

* onClick should emit an event
* onTouchEnd should emit an event

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.
