# Project Menu

The Project Menu public component allows for the selection of up to 5 consecutive projects at a
time to allow exploration of projects by different features via small bar charts.

## Requirements

* Individual projects are displayed as enlarged dots along the horizontal axis next to the company name. 
* The number inside the dot displays the number of conditions for that project.
* Dots with a visible outline are those that contain results of the keyword search.
* There is one chart per project.
* Scales horizontally to fill its container, but allows the project name to overflow out the left side
* Scales vertically to fill its container
  * Container shall provide a minimum height that fits the correct number of flags

## Interaction Requirements

Navigation can be done through either the `<List />` or Project dots.
Click, enter and touch on the project dots should all call `props.onClick(projectID)`

## Accessibility Requirements

* Keyboard interaction
* Screen reader

## Analytics Requirements

* onClick should emit an event

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.

## Examples

TODO: Implement examples of different implementations with sandbox for editing
properties on the fly.
