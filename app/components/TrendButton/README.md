# TrendButton

The Trend Button is used in View 2, and will open View 3 when clicked. It should display a preview of the View 3 graph as its background.

## Requirements
- Handles click event
	- In visualization, clicking will direct the user to View3
	- In visualization, it will change the selectedVisualization from View2 to View3
- Text reflects selected feature from the feature list
- Background image changes based on feature list selection
	- Mini version of the View3 chart
	- If no view3 chart can be rendered, then use the images

## Interaction Requirements
Click, enter, and touch should all call `props.onChange()`

## Accessibility Requirements

- Keyboard interaction
- Screen reader
  
## Analytics Requirements

- In visualization, onClick should emit an event with the following properties/labels:
	- Visualization (View/Component):
	- filter (filtered JS)
	- language (type of language)
	- Event (type of interaction)


## Unit Testing
- Unit Testing Details
	- Without a selected Feature
		- Should not render anything ✓
	- With a selectedFeature
		- should render a button ✓
		- should render a div with a class of name of trendButton ✓
		- should render a div with a className of buttonText ✓
		- should render a span for button text ✓
	- When a trendButton is clicked
		- should call it's onChange prop ✓
		- should call it's onChange prop when enter was pressed ✓
	- If streamGraph available
		- renders StreamGraph component correctly ✓
		- renders a div with a className of streamGraphBackground ✓
	- If streamGraph not available
		- renders a div with a className of staticBackground ✓
		- renders an image tag ✓
	- If streamGraph not available and Instrument is selected
		- has image source of BubbleButton ✓
	- If streamGraph not available and anything other than instrument is selected
		- has image source of StreamButton ✓
- Code Coverage Metrics:
	- 100% Coverage (Statements, Branches, Functions, Lines)