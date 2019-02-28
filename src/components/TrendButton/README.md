# TrendButton

The Trend Button is used in View 2, and will open View 3 when clicked.
It should display a preview of the View 3 graph as its background.

## Requirements
[X] Handles click event
  - In visualization, clicking will direct the user to View3
  - In visualization, it will change the selectedVisualization from View2 to View3
[X] Background image whether instruments is selected or not
[X] Displays mini version of streamGraph for all features except instruments

## Interaction Requirements
Click, enter, and touch should all call `props.onClick()`

## Accessibility Requirements
- Keyboard interaction
- Screen reader
  
## Analytics Requirements

- In visualization, onClick should emit an event with the following properties/labels:
  - Visualization (View/Component):
  - filter (filtered JS)
  - language (type of language)
  - Event (type of interaction)