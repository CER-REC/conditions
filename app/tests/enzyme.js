import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { monkeyPatchShallowWithIntl } from './utilities';

configure({ adapter: new Adapter() });
monkeyPatchShallowWithIntl();
