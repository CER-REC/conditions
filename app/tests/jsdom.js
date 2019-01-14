/* eslint-env mocha */
/* eslint-disable func-names */
import jsdomGlobal from 'jsdom-global';

// These fixtures run before/after every test and set up jsdom
// Loaded by test/mocha.opts

// Instantiate a dummy environment for imported polyfills to use.
// This environment will be wiped out when the test runs.
jsdomGlobal();

before(function () {
  this.jsdom = jsdomGlobal();
});

after(function () {
  this.jsdom();
});
