Conditions Visualization
========================

Conditions data visualization for NEB.

Quick Start
-----------

1. Install NPM dependencies `npm install`
2. Run storybook `npm run storybook`

Commands
--------

- Linting: `npm run lint`
- Testing (all): `npm run test`
- Testing (target): `npm run test:single [PATH_TO_FILES]`

Issues
------

**Windows**

If you have a space in your username then `npm run test` will fail due to `nyc`.  
You can run `npm run test:raw` or `npm run test:single app/**/*.spec.{js,jsx}`, but no test coverage analysis will be generated.
