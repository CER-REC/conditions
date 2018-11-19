# StreamLayer

The Stream Layer is a private component that will show the individual stream as selected from the Sub Feature Legend. By default, the Stream Layer components will be rendered, stacked on top of one another in order, top to bottom, from least total conditions to most as defined in the Sub Feature Legend.

## Requirements

* Handles click event
* Animate to show or hide Stream Layers

## Interaction Requirements

** Stream graph interactions are still pending full approval from the NEB

When an individual category is selected from the Sub Feature Legend, the stream graph should display a scaled version of that one stream.

When animating from all to one stream: the stream selected should animate to the baseline while the rest of the streams fade out. After that, the stream graph scales with animation.

When animating from one to all: reverse the above by scaling then changing the baseline and fading other streams in.

When animating from one to one if the scale is decreasing: first fade out the old selection and fade in the new selection.

Animations for the stream should use a cubic ease in/out curve to the time of 1 or 2 seconds.

When the user hovers (by touch or hold) over a section of the stream layer, it also highlights the area with an outline and displays the number of conditions that section has in that year (whichever year is closest to the point where the user has hovered over). Every other layer in that graph is set to 0.2 opacity as well. 

A similar effect occurs for hover even when a single stream layer is selected as well.

** For touch users, instead of hovering over sections, the user can also drag the knob on the stream graph to different stream layers to read specific values. The value given will be whichever year and stream layer is closest to where the knob is (and visually it will appear to snap to the exact points).

## Accessibility Requirements

* Keyboard interaction
* Touch screen interaction
* Screen reader

## Analytics Requirements

* onClick should emit an event

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.
