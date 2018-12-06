# CircleContainer

The circle contatiner is used to wrap around a child of either: text or an icon.
This component should be modified by using the props of: 
* size ( :int, required*)
* children ( :node, required**)
* className ( :string, optional***)
* onClick ( :function, optional)
* elevated ( :string, optional)
* disabled ( :string, optional)

*Required beause the singular value applies for both the height and width for the border-radius CSS style to render properly.

**The child which is passed in, should make use of the public "Icon" component if it is being used to wrap an icon. 

***The prop: className will enhanced the style of the component by letting the parent's SCSS define a new style. The exam below shows that the Parent's SCSS implements the style and passes the selector. 

```  
<Unknown>
  <CircleContainer size="24px" className="blue">
    <Child />
  </CircleContainer>
<style dangerouslySetInnerHTML={{__html: '.CircleContainer.blue { background: blue } '}} />   --This is representative of the SCSS file in the parent
</Unknown>

```


## Interaction Requirements

The component may need to accept the behaviour of a button. This is acheived by using the prop: onClick.
The onClick prop accepts a functions that should implement the needed behavior for a click event.


## Unit Tests

* Component|CircleContainer
  *  with default props
    *  √ should render
    *  √ should render the children
    *  √ should have an CircleContainer class
  *  Component renders with passed props
    *  √ should render the "CircleContainer" class and an extra class through the "elevated" prop
    *  √ should render the "CircleContainer" class and an extra class through the "disabled" prop
    *  √ should accept a size prop with a width and height
    *  √ should check that the prop "onClick" by default doesnt exist
    *  √ should check the "onClick" prop accepted a function then used the spread operator
    *  √ should accept a className prop from the parent to enhance the style

## Extra Refactorings:
Refactor the handleInteraction to do checking inside the method  // pass porps onCLick into a function to check and return {...handleInteraction(props.onClick)}
