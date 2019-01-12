# Main Info Bar

The Main Info Bar is public component and a footer at the bottom of the visualization, below Views 
2 and 3. By default, the Main Info Bar takes in all of the data used by the Shortcut Info Bar and
is stickied to the bottom of the page. The Main Info bar will have links for the Share Icons,
About Text Box, Methodology Text Box, and Downloads Text Box.

## Associated Components

* About Text Box [ PRIVATE ]
* Methodology Text Box [ PRIVATE ]
* Downloads Text Box [ PRIVATE ]
* Share Icon [ PUBLIC ]

## Requirements

* A horizontal bar should be visible as part of the Main Info Bar
* The horizontal bar should not overlap with the visualization at any point
* Text for 'About', 'Methodology', and 'Download' should be evenly spaced in French and English
* Share icons should be visible underneath the text

## Interaction Requirements

When text links are selected, text will slide out from underneath and
  share icons will shift to the bottom
The space for text should be a set height with a scrollbar appearing if text exceeds the set height
When text is expanded, upward pointing pink arrows should be visible centered below the share icons
When pink arrows are clicked, text should be hidden, share icons should shift up,
  and pink arrows should disappear
When text link is selected, the selected text should be bigger and bolded
Links can be clicked inside the text area
Clicking outside of the footer should close the text area
Clicking on a share icon will generate a short URL to the current view and a social media prompt
  for Email, Twitter, Facebook, or LinkedIn


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
