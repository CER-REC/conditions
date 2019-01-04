# Testing Process

## Intention

The goal of testing is to ensure that there are no bugs in the reasonable uses
of the visualization. As more functionality is developed and whenever bugs are
fixed, our test coverage will improve, and the number of edge-cases will
decrease. A useful tool for determining what hasn't been tested is the coverage
report, however we should strive for valuable tests over coverage percentage. A
covered line may not be the focus of a specific test, and we should visually
compare the code to the tests and reason whether a line is sufficiently covered.

## Testing Terminology

* Coverage: The (percentage of) lines in the visualization that have been
  executed by a test. Coverage does not mean that the line has been intentionally
  tested, only that it has been executed at least once.
* `describe`: An indicator of what unit is being tested (component, utility, etc)
* `it`: An indicator of what logic is being tested (adds classname, calculates
  formula, etc)
* `expect`: An assertation that something (variable, DOM, etc) matches our
  expectations

## Testing in React

In normal object-oriented testing, we are able to compare expected inputs and
outputs of our logic, since it can be broken down into standalone functions.
Because React connects our logic with the DOM, it requires a slightly different
approach, and we (partially) render our components and test their output with
[Enzyme](https://github.com/airbnb/enzyme/blob/master/docs/).

When we test our React components, we aren't looking to ensure that it generates
exact DOM output, since that would create too tight of a coupling between our
tests and our components. Instead, we aim to test functionality, such as `if I
pass a "disabled" property to the component, does clicking it still trigger a
callback?`
