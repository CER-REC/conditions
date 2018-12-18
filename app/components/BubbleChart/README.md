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

## Implementation Steps
* [ ] BubbleChart component is the parent component that will have calculations
  * [ ] Calculation: Loops through original data and get the minimum value among all the data sets
  * [ ] Calculation: Loops and resizes all the values to be ( #/minimumValue) * minimumPixelSize - To happen only once with main data set (unfiltered)
  * [ ] If selection made: Create a subset data and passes through to the required component
  * [ ] If no selection made: Pass in the data with resized values
  * [ ] Contains the parent svg tag that will have nested Instrument Bubbles for each category
  * [ ] Function: Get the maximum radius of the parent circle (passed down as props to the InstrumentBubble Component)
  * [ ] Calculation: After receiving maximum radius, add spacing between two circles, and add the second Instrument Bubble
  * [ ] Sizing is approximate and only goal is to ensure that they all fit inside the svg
  * [ ] Scale it appropriately based on the viewbox
  * [ ] It can be scaled appropriately using viewbox
* [ ] Instrument Bubble (Child of Bubble Chart)
  * [ ] Contains the energy circles within the bubbles
  * [ ] Use d3 packing and d3 heirarchy to render the bubbles
  * [ ] Ensure accessibility (with tabbing + onEnter)
  * [ ] onClick, removes all the existing styles on the circles + pointer svg
    * [ ] Determine the x, y of the clicked circle -> Style the stroke of the circle and add svg for pointer + line
  * [ ] During render, add additional stroke in children component so that energy bubble(parents) touch while the children nested bubbles doesn't. 
* Either BubbleChart or Instrument Bubble
  * [ ] Determine where the x, y of the text is, and ensure no circle overlap with it. 
  * [ ] Create an arc with the circle