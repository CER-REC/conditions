# StreamGraph : Control

The Control component is a private component used in the StreamGraph to pinpoint the exact number
of conditions to the user.

## Requirements

* [X] Text reflects number of Conditions
* [X] Appears only when user clicks on the StreamGraph
* [ ] Disappears when user clicks outside of the StreamGraph
* [ ] Handles drag event
* [ ] Handles arrow key events
* [ ] Handles tab events

## Interaction Requirements

The user can drag, arrow or tab across the x-axis, or if they click again on the stream graph,
the control will move to the nearest location of the new click.

## Accessibility Requirements

* Keyboard interaction
* Touch screen interaction
* Screen reader

## Analytics Requirements

* onArrowKey should emit an event
* onTouchEnd should emit an event
* onDragEnd should emit an event

## Unit Testing

TODO
