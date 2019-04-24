# Component GreyPipe

The GreyPipe component is a SVG element that is computed based on values passed into props.
The pipe is drawn from the left bottom position to the  top right(from the wheel to the project menu). 
There are 4 sections in the pipe: bottomCurve, verticalLine, topCurve, and horizontalLine. Each section 
has a corresponding prop that will define its value. The pipe also has a prop of width that will define 
the with of the entire pipe, and be used to calculate the size of the entire SVG.

## Interaction Requirements

This component has no interaction.

## Accessibility Requirements

Should Have a `<title />` for the component Name
Should have a `<description />` explaining the pipe 

## Unit Testing

* [X] Should have a `<svg />` element.
* [X] Should have a `<path />` element inside the svg.
* [X] Should have a  draw string (`d="..."`) attribute for the `<path />` element
* [X] Should have a `svg` height of: offset + width(bottomCurve) + verticalLine + width(topCurve) + offset.
* [X] Should have a `svg` width of: width + width + horizontalLine.

