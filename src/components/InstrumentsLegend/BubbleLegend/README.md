# Bubble Legend

The Bubble Legend component is a private component used in view 3. It displays a title, ellipses,
and values from 1 to 1600. The scale of the bubbles corresponding with the legend should take
precedence over resolving layout concerns and the legend corresponds to individual bubbles.
Feedback from the design team is needed for whether the legend scales or not.

In order for the Bubble Legend to display the correctly scaled values:
In the Instruments Bubble public component, the Bubbles need to be scaled relative to each other
The scaling needs to be synchronized in the InstrumentBubble and BubbleChart public components
  The two requirements above could potentially be solved by merging the InstrumentBubble and
  BubbleChart public components
A property accounting for the size of a bubble with 100 Conditions needs to be passed
  into the Bubble Legend

## Requirements

* [X] Renders a title for 'Number of Conditions'
* [X] Displays 10, 100, 1000, and the max value
* [] If the max value is larger than what can fit in the space of the legend, replace it with highest value that can fit
* [] The scale of the bubbles should match that of the bubble chart (using a prop for largest value)
