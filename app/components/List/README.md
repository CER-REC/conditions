# List

The List component is a reusable component for rendering a list of items with
simple support for arrows, keyboard and mouse support, and scroll wheel support.

## Requirements

* [ ] Previous and Next arrows
 * [ ] Previous doesn't display on first item
 * [ ] Next does display on last item
* [ ] Can render text or components as items
* [x] Adds mouse/keyboard interaction for selecting items
 * [x] Interaction can be disabled with `itemInteractions={false}`
* [ ] Can be displayed as a vertical or horizontal list
* [ ] Can be styled with a className prop
* [x] Defaults selected item to first in the list

## Interaction Requirements

* [ ] Tab between visible items and arrows
 * Arrows should appear between the selected item and its siblings
* [x] Clicking or pressing enter on an item emits an onChange event
* [ ] Clicking or pressing enter on an arrow emits an onChange event

## Accessibility Requirements

* [ ] Previous and Next arrows
 * [ ] Keyboard interaction
 * [ ] Screen reader attempts to read prev/next item title
* [ ] `itemInteractions={true}`
 * [ ] Keyboard selection
 * [ ] Screen reader support for items

## Analytics Requirements

* [ ] onChange should emit an event

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.
