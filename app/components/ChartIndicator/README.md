# ChartIndicator

ChartIndicator is a public component that will be used by both StreamGraph and BubbleChart. This
component will only be displayed if the user has interacted with either the StreamGraph or
BubbleChart.

* It takes in 3 parameters 
  * x: The x position that the arrow/line will be rendered at
  * ystart: The starting y value arrow will start at
  * yend: The ending y value that the line will stop at

TODO: Since the ChartIndicator will not be displayed when the user clicks away from the Streamgraph
or BubbleChart we need to decide if it will be shown when we are in screenshot mode.

## Requirements
* [X] Renders the arrow and the line
* [X] Position them appropriately based on passed parameters

## Unit Testing
TODO: Provide table of automated unit test results and code coverage metrics.
