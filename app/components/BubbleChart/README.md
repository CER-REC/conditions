# BubbleChart
The Bubble Chart is the parent svg container that will contain both Energy Bubbles (larger circles) and it's corresponding nested Instrument Bubbles (smaller circles). It will also perform majority of the calculations and will show only when the Instrument is selected in the legend.

## Requirements
* [ ] Renders a parent bubble with instruments combined as All Commodity Types
* [ ] Renders parent bubbles for each instrument subtype (gas, power, oil, and not specified)
* [ ] Renders nested children bubbles reflecting the size of the instrument 
* [ ] Color of the bubbles are dependent on the category of the instrument
* [ ] If a instrument is already selected, create an arrow at the top and a line from the top to the center
  * [ ] Show the number of conditions 

## Interaction Requirements
* [ ] When single bubble is clicked : Should call it's onClick prop which will set/change the selected instrument
* [ ] When the mouse is hovered for more than __ seconds: Should call it's onClick prop which will set/change the selected instrument
* [ ] If clicked outside of selected instrument, return opacity to 100% 
  * [ ] Remove the conditions text of the selected circle

## Accessibility Requirements
* [ ] Keyboard Interaction
  * [ ] onEnter 
  * [ ] onHover/onSelected
  * [ ] On Tab
* [ ] Screen Reader

## Analytics Requirements
* [ ] onClick should emit an event
* [ ] onEnter should emit an event
* [ ] onHover for more than __ seconds should emit an event