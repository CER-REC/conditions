# Share Icon

The Share Icon component is a public component that will render the icons for Email, Facebook,
Twitter, and LinkedIn. The Share Icon will be used by the Main Info Bar and Shortcut Info Bar
components. This component will handle generating a shortened URL for users to share their View 
of the visualization.

## Associated Components

* Main Info Bar [ PUBLIC ]
* Shortcut Info Bar [ PUBLIC ]
* Donwloads text [ PRIVATE ]

## Requirements

* Render out icons for:
  * Email
  * Twitter
  * Facebook
  * LinkedIn

## Interaction Requirements

Clicking on a share icon will generate a short URL to the current view and a social media prompt
  for Email, Twitter, Facebook, or LinkedIn


## Accessibility Requirements

* Keyboard interaction
* Screen reader

## Analytics Requirements

* onClick should emit an event
* onKeyDown should emit an event

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.

## Examples

TODO: Implement examples of different implementations with sandbox for editing
properties on the fly.
