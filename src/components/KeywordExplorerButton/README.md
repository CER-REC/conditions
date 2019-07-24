# KeywordExplorerButton

The Keyword Explorer Button is used in View 2, and switch back to the View1 when clicked.

## Requirements
[X] Handles click event
  - In visualization, clicking will direct the user to View1
  - In visualization, it will change the selectedVisualization from View2 to View1

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