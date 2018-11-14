/* eslint-env browser */
import path from 'path';
import { JSDOM } from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const { window } = new JSDOM('<!doctype html><html><body></body></html>');

global.document = window.document;
global.window = window;

// TODO: Stuffing props into the global isn't supported by JSDOM. Find another way
const excludeProperties = [
  'localStorage',
  'sessionStorage',
];
Object.keys(window).forEach((key) => {
  if (excludeProperties.includes(key)) { return; }
  if (!(key in global)) {
    global[key] = window[key];
  }
});
