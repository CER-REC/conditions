# BubbleChart
The Bubble Chart is the parent svg container that will contain Instrument Bubbles (smaller circles). It will also perform majority of the calculations and will show only when the Instrument is selected in the legend.

## Requirements
* [ ] Renders a parent bubble with instruments combined as All Commodity Types
* [ ] Renders parent bubbles for each instrument subtype (gas, power, oil, and not specified)


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