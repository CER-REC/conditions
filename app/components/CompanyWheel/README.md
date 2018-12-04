# CompanyWheel

The company wheel displays all projects grouped by company as well as relationships between companies. It is rendered as part of view 2.

The Company Wheel component uses the following sub-components to render:
* List 
* CompanyRay
* CompanyFlag
* ProjectDot
* RelationshipCord
* PullToSpin 

TODO: Find how to do the triangles/ flags (d3? React? Algorithm? HardCoded?) 

TODO: always calculate the number of companies as n+2 due to the gray ray which shoots out the current company ocuppying three rays.

## Interaction Requirements

* [ ] Moving the wheel
 * [ ] Tell v2.5 & 2.7 not to render
 * [ ] Click and drag
 * [ ] Click NO drag
 * [ ] Touch and drag
 * [ ] Touch and NO drag
 * [ ] Scroll in area of wheel
   * [ ] Scroll CLICK in area of wheel
   * [ ] Scroll TOUCH in area of wheel
 * [ ] List icon click button

* [ ] Spin Lever
 * [ ] On click in area of element 
 * [ ] On touch in area of element 
 * [ ] On click of text instructions
 * [ ] On touch of text instructions

TODO: Explain interaction requirements, mentioning differences for cursor, touch,
and keyboard navigation.

## Accessibility Requirements

TODO: Explain desired accessibility support, and provide table of currently
implemented accessibility with table of automated accessibility test results.

## Analytics Requirements

TODO: Explain what analytics events should be fired from this component, and
provide table of currently implemented analytics events with table of automated
analytics test results.

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.

## Examples

TODO: Implement examples of different implementations with sandbox for editing
properties on the fly.
