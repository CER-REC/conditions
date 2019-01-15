# BarContainer

The Bar Container component holds a grouping of bar. The container accepts an array 
of bars to render. Each element in the array should have a value and a color. 
Depending on the the tpe of BarContainer (vertical or horizontal) the 
value passed in will affect the size of each bar. The BarContainer by default 
is horizontal. The BarContainer accepts a 'size' prop. If the container is 
horizontal, the size prop will determine the height for all bars, and if the
container is vertical, the size prop determines the width of each bar in the set.

BarContainer has a prop called 'standalone' this prop will conditionally render 
the component with a ```<g></g>``` container instead of the default ```<svg></svg>```.
This is done so the container will work inside of a current svg without nesting
a sub svg element.

## Interaction Requirements

The BarContainer does not implement any interaction functionality.

## Accessibility Requirements

The BarContainer has two props that are needed for accessibility, 'title' and 
'desc'. They are not rendered as text in the DOM but they are used by the screen 
readers and other accessibility tools. 
