# ConditionDetails

ConditionDetails is an overview of the selected project. It contains:

- A header displaying the name of the project
- A chronological list of all conditions for that project
- All of the content for the condition/instrument selected in the list
- In View 3, a collapsable panel with feature details for the selected item, such as the relevant theme or instrument type

## Requirements

### Header

- Should display the name of the project
- The name should be clickable (denoted by a pink star) to bring up a window of further project information
- In View 3, there should be a button to toggle the Details panel open and closed

### List

- Uses the public List component
- Each condition is represented by a BarContainer component, whose length corresponds to the length of the condition text. (Binned into short, medium, and long)
- Conditions are coloured according to the currently selected feature, and can have more than one color - in this case, the bar should be split evenly among them
- Conditions matching the current search keywords should be given a small red "tab" at one end
- Conditions are grouped by Instrument and sorted within their instrument in their original order
- Instruments are sorted by their effective date from earliest to latest
- Each new instrument is denoted in the list by its effective date; this date can be clicked to get detailed information about the instrument

### Content

- When a condition is selected, should display the Effective Date, Instrument Number, Keywords, and condition Text
- When an instrument is selected, should display the Issuance, Effective, and Sunset Dates, the Instrument Number, Status, and Type, the Location, and the instrument's text (Activity)
- The Instrument Number should be highlighted and clickable, opening the Intermediate Popup component
- Condition text (and Instrument activity?) should be split into paragraphs, with search keywords highlighted

### Details

(Only available in View 3)

- Should list the Theme, Instrument, Phase, Type, Status, and Filing types of the current condition
- Should be collapsable by clicking on a toggle button in the Header
- Expanding/collapsing should be animated, with the entire ConditionDetails component sliding left to make room for the Details panel

## Interaction Requirements

- Click functionality:
  - Project name: Should opening the project details window
  - List: Should allow different items to be selected
  - Instrument number: Should open the Intermediate Popup window
  - Details toggle: Should expand/collapse the details panel
- Scrolling:
  - The list, content, and details containers

## Accessibility Requirements

Tab interaction, Description and Title elements

## Unit Testing

[ ] Implemented test suite from requirements
