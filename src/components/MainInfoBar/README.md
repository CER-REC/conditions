# Main Info Bar

The Main Info Bar is a public component placed in the Footer at the bottom of the visualization, below Views 2 and 3. The Main Info Bar will have links for the Share Icons, About box, Methodology box, and Downloads box.

## Associated Components

* About Box [ PRIVATE ]
* Methodology Box [ PRIVATE ]
* Downloads Box [ PRIVATE ]
* Share Icon [ PUBLIC ]

## Requirements

- A horizontal bar should be visible at the top of the Main Info Bar
- Buttons labelled 'About', 'Methodology', and 'Download' should be evenly spaced in French and English
- Share icons should be visible underneath the text

## Interaction Requirements

- When a heading button is selected, text will slide out from underneath and the Share Icons will shift to the bottom
- When text is expanded, upward pointing pink arrows should be visible centered below the share icons
- When pink arrows are clicked, they should disappear and the text box should slide back up to its original state
- When a heading button is selected, the selected text should be bigger and bolded
- Links can be clicked inside the text area
- Clicking on a share icon will generate a short URL to the current view and a social media prompt for Email, Twitter, Facebook, or LinkedIn

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
