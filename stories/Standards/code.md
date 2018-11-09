# Code

## Linting

All code should be linted with ESLint and the AirBnB React configuration, so that
we have a consist style across components. This can be linted locally by an
integration with your IDE, or by running `npm run lint`. It will also be
automatically linted when a pull request is created.

## Naming Convention

* Components should be Pascal-case (`MyComponentName`)
 * Component folders/filenames (other than index.jsx) should match the name of
 the exported component
* Functions should be snake-case (`myFunctionName`)
* Variables should be snake-case (`myVariableName`)
 * Variables should not start with an underscore. Variables and class properties
 should be viewed as private, with the only public scope being React props or
 exports
