# Crosshairs

The Crosshairs is a private component that appears as dashed guidelines to indicate more precision for the user. A knob will show where the user has clicked on the selected stream layer and a textbox displaying the number of conditions will render at the top of the vertical crosshair.

## Requirements

* Handles click event
* Draggable on desktop and handles hover and hold events on touch devices
* Text reflects number of Conditions

## Interaction Requirements

** Stream graph interactions are still pending full approval from the NEB

When the user hovers (by touch or hold) over a section of the stream graph, it displays the number of conditions that stream layer has in that year (whichever year is closest to the point where the user has hovered over). The dashed guidelines that appear indicate more precision for the user.

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
