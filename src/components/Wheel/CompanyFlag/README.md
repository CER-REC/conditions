# CompanyFlag

The Company Flag is a private component, used by the Wheel when in Company mode. It displays a ray of Project Dots associated with each company in the wheel. Beyond a certain number of dots, the ray is "folded" into a shorter, flaglike shape.

## Requirements

* [x] Renders a collection of ProjectDot components as a single ray
* [x] Folds larger collections, starting from the outer end, creating a triangular "flag" to save space
  * [x] Flags should never be folded to a point where they intersect another ray's dots
  * [x] Flags should maintain a minimum distance from other rays' dots to provide visual separation

## Interaction Requirements

None? (Should be provided by the parent WheelRay)

## Accessibility Requirements

TODO: Explain desired accessibility support, and provide table of currently
implemented accessibility with table of automated accessibility test results.

## Analytics Requirements

TODO: Explain what analytics events should be fired from this component, and
provide table of currently implemented analytics events with table of automated
analytics test results.

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.
