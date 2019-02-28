# Wheel

* TODO: Wheel
  * Company wheel variant
        # sorted alphabetically to improve rendering speed
        company_wheel: {
          company: {
            id: guid,
            name: string,
            relationship: {[id]},
            projects: {TBD}
            letter: ? // could also acquire it by sorting on client side
          }
        }

  * Location wheel variant
        # grouped west to east with the territories at the end
        location_wheel: {
          province_grouped: {
            province_or_territory:{
              region: {
                company: {
                  id: guid,
                  name: string,
                },
                graph_data: {TBD}
              }
            }
          }
        }

* TODO: WheelRay
  * Create Company type of ray
  * Location legend
      * Adjust positioning for it to be in the middle of the bounds corresponding to beginning and end of province
      * Draw bounds on ring for beginning and end of provinces
      * Account for the no region graph (the gray one on the design doc)
* TODO: WheelCompanyFlag
  * create component
  * type location normal
  * Find how to do the triangles/ flags (d3? React? Algorithm? HardCoded?) 

* TODO: relationshipCord
  * create component
  * figure out degree dynamic render

* TODO: PullToSpin.
  * Fix rendering on IE
  * Pull To spin functionality???

The Wheel displays all projects grouped by company as well as relationships between companies.
It is rendered as part of view 2. The Wheel will also display the locational overview of all
conditions in a region viewed by Theme (as the default).

The Wheel component uses the following sub-components to render:
* List 
* WheelRay
* CompanyFlag
* ProjectDot
* PullToSpin 

## Interaction Requirements
* Moving the wheel
 * [ ] Tell v2.5 & 2.7 not to render
 * [ ] Click and drag
 * [ ] Click NO drag
 * [ ] Touch and drag
 * [ ] Touch and NO drag
 * [ ] Scroll in area of wheel
   * [ ] Scroll CLICK in area of wheel
   * [ ] Scroll TOUCH in area of wheel
 * [ ] List icon click button

* Spin Lever
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
