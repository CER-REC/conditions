# Bubble Legend

The Bubble Legend component is a private component used in view 3. It displays a title, ellipses,
and values from 1 to 1600.

The ellipses in the legend increase width-wise relative to the sizes in the Bubble Chart. The
implementation of these ellipses requires feedback from the iLab for cases where:

  - There is only one bubble with 500 Conditions. Should it remain the same size or take up more
      of the space? If it is rescaled, this will require the Legend to rescale as well
  - There is a Bubble with 2000 Conditions. Should the Legend rescale?
  - Is it the total number of Conditions in each Bubble (ie, 'Gas', 'Power', 'Oil', etc.) or is it
      each individual Bubble inside the large grey Bubbles? This might be an issue with the colour 
      of the ellipses in the Legend

## Requirements

* [ ] Renders a title for 'Number of Conditions'
* [ ] Displays a number scale from 1 - 1600
* [ ] Displays ellipses increasing in width relative to sizes of the Bubbles in the Bubble chart
