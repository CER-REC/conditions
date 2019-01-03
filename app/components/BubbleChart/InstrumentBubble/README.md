
# Instrument Bubble
The Instrument Bubble is a private/child component. It will render the instrumentBubbles in groups (ie oil, gas, power ). 


## Requirements
* [X] Renders nested children bubbles reflecting the size of the instrument 
* [X] Color of the bubbles are dependent on the category of the instrument
* [ ] If a instrument is already selected, create an arrow at the top and a line from the top to the center
  * [ ] Show the number of conditions 

## Interaction Requirements
* [X] When single bubble is clicked : Should call it's onClick prop which will set/change the selected instrument
<!-- TODO -->
* [ ] When the mouse is hovered for more than __ seconds: Should call it's onClick prop which will set/change the selected instrument

## Accessibility Requirements
* [ ] Keyboard Interaction
  * [ ] onEnter 
  * [ ] onHover/onSelected
  * [ ] On Tab
* [ ] Screen Reader

## Analytics Requirements
* [ ] onClick should emit an event
* [ ] onEnter should emit an event
* [ ] onHover for should emit an event

## Implementation Steps 
* [ ] Instrument Bubble (Child of Bubble Chart)
  * [X] Contains the energy circles within the bubbles
  * [X] Use d3 packing and d3 heirarchy to render the bubbles
  * [X] Ensure accessibility (with tabbing + onEnter)
  * [ ] On hover (timing to be determined) should same action as onClick
  * [X] Ensure proper padding so energy bubble(parents) touch while the children nested bubbles doesn't. 
* [X] Text to arc on the circle
  * [ ] Text place so that it doesn't overlap with another circle