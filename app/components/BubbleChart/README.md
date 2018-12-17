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

##Implementation Basics
* [ ] Obtain the smallest number and set up a radius
* [ ] Proportionally increase the radius of all circles, based on the minimum radius
* [ ] If circle has minimum radius, then create a circle with larger circle with text included and render it
* [ ] Obtain the radius of the largest circle and obtain x, y, and radius for reference as required 
* [ ] Method 1: Render each circle (Energy bubble indepdently)
* [ ] Method 2: Render the 3 circles with it's corresponding 2 circles. (ie left/right of the svg)
  * [ ] The three circles in the left and the two circles on the right are seperate circles for the main svg
* [ ] It will later be scaled appropriately using viewbox