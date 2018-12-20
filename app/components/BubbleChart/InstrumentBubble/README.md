
# Instrument Bubble
The Instrument Bubble is a private/child component. It will render the instrumentBubbles in groups (ie oil, gas, power ). 


## Requirements
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
* [ ] Instrument Bubble (Child of Bubble Chart)
  * [X] Contains the energy circles within the bubbles
  * [X] Use d3 packing and d3 heirarchy to render the bubbles
  * [X] Ensure accessibility (with tabbing + onEnter)
  * [ ] onClick, removes all the existing styles on the circles + pointer svg
    * [ ] Determine the x, y of the clicked circle -> Style the stroke of the circle and add svg for pointer
    * [ ] Display line and arrow 
  * [ ] During render, add additional stroke in children component so that energy bubble(parents) touch while the children nested bubbles doesn't. 
* [ ] Text to arc on the circle