# CompanyWheel

TODO: Summarize purpose and requirements from design document.

TODO: Decide on how to render and animate company wheel? (canvas with controlled animation via Konva and react-spring, nivo chord with svg render potentially embed flags as legends, or straight up d3 from https://beta.observablehq.com/@mbostock/d3-chord-diagram )

TODO: Find how to do the triangles/ flags (d3? React? Algorithm? HardCoded?) 

TODO: Once triangle structure is decided, how to structure triangle ( Component? Private or public? or based on graph       library? )

TODO: always calculate the number of companies as n+2 due to the gray ray which shoots out the current company ocuppying three rays.

The Company wheel component renders the company wheel for view 2. This component uses the public List component and the CompanyRay, CompanyFlag, ProjectDot, RelationshipCord, and PullToSpin private components.

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
