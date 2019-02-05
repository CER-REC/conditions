# StreamGraph : Stack Group

The Stack Group is a private component used in View 3 that binds the interactions for the ChartIndicator
public component. The Stack Group component will not rendering anything unless the ChartIndicator
is showing

## Requirements

* [X] Renders the ChartIndicator when the Streamgraph is selected
* [X] Handles clicking on the Streamgraph
* [X] Handles dragging on the Streamgraph
* [X] Handles the use of arrow keys on the Streamgraph
* [X] Handles focusing on the Streamgraph
* [X] Gets the appropriate year and Conditions count when an event is taken on the Streamgraph

## Accessibility Requirements

* Keyboard interaction
* Touch screen interaction
* Screen reader

## Analytics Requirements

* onClick should emit an event
* onDragStop should emit an event
* onTouchEnd should emit an event

## Unit Testing

TODO: tests pending 
