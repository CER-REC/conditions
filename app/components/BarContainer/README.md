# BarContainer

The Bar Container component holds a grouping of bar. The container accepts an array 
of bars to render. Each element in the array should have a value and a color. Depending on the on the the tpe of BarContainer (vertical or horizontal) the value passed in with affect the size of each bar. The BarContainer b default is is horizontal. THe BarContainer accepts a 'size' prop. If the container is horizontal, 
the size prop will determine how the height for all bars, and if the container is vertical, the size prop determines the width of each bar in the set.

## Interaction Requirements

The BarContainer does not implement any interaction functionality.

## Accessibility Requirements

The BarContainer has two props that are needed for accessibility, 'title' and 
'desc'. They are not rendered as text in the DOM but they are used by the screen readers and other accessibility tools. 
