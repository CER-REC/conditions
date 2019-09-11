import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { monkeyPatchShallowWithIntl } from './utilities';
import { connectAnalyticsToStore } from '../utilities/analyticsReporting';

registerRequireContextHook();
configure({ adapter: new Adapter() });
monkeyPatchShallowWithIntl();
global.open = jest.fn();
global.location.assign = jest.fn();

global.store = {
  state: {},
  getState() { return this.state; },
  setState(newState) { this.state = newState; },
};
window.dataLayer = [];
connectAnalyticsToStore(global.store, () => {}, true);
