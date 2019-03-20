# LocationRay

The LocationRay component is part of the wheel component. It provides access to information about regions. The information displayed changes with the different features chosen in the encoding menu. By default the theme is active, other options include instrument, phase, type, status, and filing. 
The information in the locationRay is also modified by the search filters. While filters are applied the scale of the graphs may be modified to represent relevant information. 

## Requirements

* [x] Renders a graph bar using the barcontainer public component.
  * [x] A minimum value is displayed to ensure representation of data. (i.e making it visibile if it's less than a pixel, Handled by the bar container)
  * [ ] Calculates the collective large value to take out outliers.
* [ ] Renders different graphs depending on the feature chosen from the encoding menu.
* [ ] Rerenders on data change (i.e filtering per year)
* [ ] Renders the projects without any region in a group with it's own scale in the last slot.

## Interaction Requirements

* [ ] Clicking on a Ray feeds back the region (id) to the wheel.
* [ ] Any additional interaction is handled by the company wheel. 

## Accessibility Requirements

TODO: Explain desired accessibility support, and provide table of currently
implemented accessibility with table of automated accessibility test results.

## Analytics Requirements

TODO: Explain what analytics events should be fired from this component, and
provide table of currently implemented analytics events with table of automated
analytics test results.

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.


