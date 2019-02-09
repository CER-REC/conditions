# Shortcut Info Bar

The Shortcut Info Bar is public component that exists in View 1. The user can click on the
Information Icon and it will expand(sliding from the left to the right in an animated 
transition) to reveal more actions. The Shortcut Info Bar will use the Share Icons public
component and the About Text Box.

## Associated Components

* Share Icon [ PUBLIC ]
* About Text Box [ PUBLIC ]
* Methodology Text Box [ PRIVATE ]
* Downloads Text Box [ PRIVATE ]

## Requirements

* An information icon should be shown to the user
* When the Information icon is selected:
  * Links for 'About this Visualization'
  * Share icons should be visible

## Interaction Requirements

TODO: Ask UofC about clicking on expanded Shortcut Info Bar. Currently working with the assumption
that clicking again will slide the Information Icon to the right and hide actions

When text link for 'About this Visualization' is selected, the About Text Box should open
underneath the Main Info Bar
The Information icon should shift left when it is clicked
The Share Icons and text link should appear after the Information icon is selected


## Accessibility Requirements

* Keyboard interaction
* Screen reader

## Analytics Requirements

* onClick should emit an event

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.

## Examples

TODO: Implement examples of different implementations with sandbox for editing
properties on the fly.
