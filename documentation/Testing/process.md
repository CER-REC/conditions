# Testing Process

## Intention

The goal of testing is to ensure that there are no bugs in the reasonable uses
of the visualization. As more functionality is developed and whenever bugs are
fixed, our test coverage will improve, and the number of edge-cases will
decrease. A useful tool for determining what hasn't been tested is the coverage
report, however we should strive for valuable tests over coverage percentage. A
covered line may not be the focus of a specific test, and we should visually
compare the code to the tests and reason whether a line is sufficiently covered.

## Testing Libraries

In terms of testing, the 'Testing Pyramid' is a general example of how different
types of testing interact together. The difference for React is that it is
opinionated in how data and logic are linked. Meaning that components being
composed of other components make it hard to do unit test in isolation.

To not abstract testing too much, it's easy to view tests in 3 categories.
From smallest largest they are: Unit Tests, Integration (or Service) Tests,
and UI tests.
[Test Pyramid in depth](https://martinfowler.com/articles/practical-test-pyramid.html)

When we test our React components, we aren't looking to ensure that it generates
exact DOM output, since that would create too tight of a coupling between our
tests and our components. Instead, we aim to test functionality, such as `if I
pass a "disabled" property to the component, does clicking it still trigger a
callback?`

### What we are using:

[Jest](https://js.io/) - as our test runner and assertion library

* `describe`: An indicator of what unit is being tested (component, utility, etc)
* `it`: An indicator of what logic is being tested (adds classname, calculates
  formula, etc)
* `expect`: An assertation that something (variable, DOM, etc) matches our
  expectations

[Sinon](https://sinonjs.org/) - for our fixtures. Fixtures are just that, they
are "fixed" to what ever they are attached to based on the scope they are given.
 We can use Sinon with other libraries like [Axios](https://github.com/axios/axios)
 to help us mock out network/web-service integration tests.

[Enzyme](https://airbnb.io/enzyme/) - In normal object-oriented testing, we are
able to compare expected inputs and outputs of our logic, since it can be broken
down into standalone functions. Because React connects our logic with the DOM,
it requires a slightly different approach, and we (partially) render our components
and test their output.

We are using enzyme to help with then render portion of the unit under test.
Part of the problem is that we want to test an isolated component that is not
linked to other dependencies. Therefore Enzyme allows us to use 'shallow' to
render a single component without the children it needs to support (a lot of
this has to with how the react life cycle methods work in the initialization
stage and that children are needed to initialize before render and other
life-cycle methods can be run by default). There are other methods that we can
use to render components with their children when we want to start doing integration
tests. Enzymes Mount and Render function allow us to do that.

[Jest](https://jestjs.io/) - later on we may use be using Jest to enhance our
tests. Jest is the other side of the coin. Jest Snapshots (not the same as a
screenshot, which we may also use) takes the 'getSnapshotBeforeUpdate()' life-cycle
method and looks at the components right before the changes are committed to the
DOM. The value of jest is that snapshots show how the output will look as rendered
HTML. Snapshots are nice however they don't check logic they only show the
rendered output. This is closer to UI testing than unit tests. Jest is it's own
test runner, and is used by many companies instead of using Mocha.

[Storybook](https://storybook.js.org/) - if all the unit, integration and
snapshot tests pass we still aren't viewing the actual rendered output. The last
two types of tests complete the cycle. First is storybook which is a way for
testers and developers to see the components rendered out in isolation hydrated
with props, it also gives us the ability to see the components at different
states using specific props.

Furthermore, we have snapshots which can be done by headless browsers.
This is our last bit of functionality that we can use to do pixel matching to
test output on various screen sizes and resolutions. This part is more important,
as designers have created specific ratios based on design principles. By
checking that we are following those requirements, we can now ensure that the
money spent on design was implemented across multiple view-ports.

End to End: this one has become more controversial over time. Google's Testing
Blog explains [why E2E testing shouldn't necessarily be trusted](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html).
There are many libraries to do React E2E: [Cypress](https://www.cypress.io/), [Nightwatch](http://nightwatchjs.org/)

[Istanbul/nyc](https://istanbul.js.org/) - as our coverage tool.
The (percentage of) lines in the visualization that have been
executed by a test. Coverage does not mean that the line has been intentionally
tested, only that it has been executed at least once.
