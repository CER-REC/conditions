# BubbleChart

The Bubble Chart public component is the parent svg container that will contain
Instrument Bubbles (smaller circles).

## Requirements
* [X] Checks for selected feature and only
      renders when it is equal to "instrument" 
* [X] Renders Instrument sub-bubbles 
      with varying data and svg size
* [X] Passes in the required data and 
      function for individual instrument bubble component
* [X] Converts data into nodes to 
      be passed into InstrumentChart
* [X] OnClick, onDrag, keypress functions

## Interaction Requirements
* [ ] onKeyPress, detect which element
      currently selected and send position to ChartIndicator
* [ ] onDrag, calculate the closest 
      position as per mouse and position chartIndicator accordingly
