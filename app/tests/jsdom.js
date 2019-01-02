/* eslint-env mocha */
/* eslint-disable func-names */
import jsdomGlobal from 'jsdom-global';

// These fixtures run before/after every test and set up jsdom
// Loaded by test/mocha.opts

before(function () {
  this.jsdom = jsdomGlobal();
});

after(function () {
  this.jsdom();
});
