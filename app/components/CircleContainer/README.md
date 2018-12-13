# CircleContainer

The circle container is used to wrap around a child of either: text or an icon.
This component should be modified by using the props of: 
* size ( :int, required)
* children ( :node, required*)
* className ( :string, optional**)
* onClick ( :function, optional)
* elevated ( :bool, optional)
* disabled ( :bool, optional)


*Make use of the public "Icon" component if it is being used to wrap an icon. 

**The prop: className will enhanced the style of the component by letting the
parent's SCSS define a new style. The example below shows that the parent's 
SCSS implements the style and passes the selector. 

Note: when using the props elevated or disabled they booleans and not string 
even though the prop is evaluated to true of false, notice they dont have 
quotations. I thought this was an interesting.

```  
<Unknown>
  <CircleContainer size="24px" className="blue">
    <Child />
  </CircleContainer>
<style dangerouslySetInnerHTML={
    {__html: '.CircleContainer.blue { background: blue } '}} 
  />   --This is representative of the SCSS file in the parent
</Unknown>

```
## Interaction Requirements

The component may need to accept the behavior of a button. This is achieved by 
using the prop: onClick.
The onClick prop accepts a functions that should implement the needed behavior
for a click event.


## Extra Refactoring:
// pass props onCLick into a function to check and return
Refactor the handleInteraction to do checking inside the method 
{...handleInteraction(props.onClick)}
