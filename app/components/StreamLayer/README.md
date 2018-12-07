# StreamLayer

The Stream Graph is a public component used in View 3 by the Small Multiples Legend and StreamGraph. 

## Requirements

* [] Handles click event

## Data Requirements

* Placeholder for 0 values
* Colour value

## Interaction Requirements

** Stream graph interactions are still pending full approval from the NEB

Implementation of interactions will be completed in the public components the StreamLayer is rendered in. 

## Accessibility Requirements

* Screen reader

## Analytics Requirements

* onClick should emit an event

## Unit Testing

* Component|StreamLayer
  * with default props
    * √ should render
    * √ should take in props for id
    * √ should take in props for data
    * √ should take in props for fill
    * √ should take in props for stroke
    * √ should take in props for strokewidth
    * √ should take in props for standalone