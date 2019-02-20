# ConditionDetails

ConditionDetails is an overview of the selected project. It contains:

- A header (`ProjectHeader`) displaying the name of the project
- A chronological list (`ConditionList`) of all conditions for that project
- All of the content (`Content`) for the condition/instrument selected in the list
- In View 3, a collapsable panel (`Details`) with feature details for the selected item, such as the relevant theme or instrument type

## Requirements

- Should place its child components in a grid layout

### Details

- Should be collapsable by clicking on a toggle button in the Header
- Should allow the Details panel to be expanded/collapsed, with the entire ConditionDetails component sliding left to make room for it

## Interaction Requirements

- Click functionality:
  - Project name: Should opening the project details window
  - List: Should allow different items to be selected
  - Instrument number: Should open the Intermediate Popup window
  - Details toggle: Should expand/collapse the details panel
- Scrolling:
  - The list, content, and details containers
