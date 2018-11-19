# Project Menu

The project menu allows for the selection of up to 6 consecutive projects at a time to allow exploration of projects by different features via small bar charts.

## Requirements

* By default, the projects should display in english. Shown under each project.  `Conditions.ConcatTheme(english)`
* Individual projects are displayed as enlarged dots along the horizontal axis next to the company name. 
* The number inside the dot displays the number of conditions for that project.
* Dots with a visible outline are those that contain results of the keyword search.
* There is one chart per project.


## Interaction Requirements

Navigation can be done through either the <List /> or Project dots.
Click, enter and touch on the project dots should all call `props.onClick(projectIndex)`

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
