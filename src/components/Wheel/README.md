# Wheel

* TODO: Wheel
  * Design data:
    wheel: {
      company_wheel: {
        alphabetically_grouped: {
          letter: {
            company: {
              id: guid,
              name: string,
              relationship: {[id]},
              projects: {TBD}
            }
          }
        }
      }
      location_wheel: {
        # grouped west to east with the territories at the end
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
    } 
  * Cleanup and outsource all private components.
  * Find out if delegating the calculation of rendering for wheelray and wheelraylegend should be at the company wheel level 
  * Resolve issue with edge case of stripePosition being between -halfReservedDegrees < 0 > +halfReservedDegrees
  
* TODO: WheelRay
  * create component
  * Create the two types of ray

* TODO: WheelCompanyFlag
  * create component
  * type location normal
  * Find how to do the triangles/ flags (d3? React? Algorithm? HardCoded?) 

* TODO: WheelLocationBar
  * create component

* TODO: relationshipCord
  * create component
  * figure out degree dynamic render

* TODO: PullToSpin.
  * create component
  * design graphics
  * implement duration measurement for mousedown  
  * hookup function to parent

The Wheel displays all projects grouped by company as well as relationships between companies.
It is rendered as part of view 2. The Wheel will also display the locational overview of all
conditions in a region viewed by Theme (as the default).

The Wheel component uses the following sub-components to render:
* List 
* WheelRay
* WheelCompanyFlag
* WheelLocationBar
* WheelProjectDot
* WheelRelationshipCord
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
