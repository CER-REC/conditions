# Bubble Legend

The Bubble Legend component is a private component used in view 3. It displays a title, ellipses,
and values from 1 to 1600. The scale of the bubbles corresponding with the legend should take
precedence over resolving layout concerns and the legend corresponds to individual bubbles.
Feedback from the design team is needed for whether the legend scales or not.

## Requirements

* [X] Renders a title for 'Number of Conditions'
* [X] Displays 1, 500, 1000, and 1600 regardless of what the largest bubble actually is
* [ ] The scale of the bubbles should match that of the bubble chart (using a prop for largest value)
