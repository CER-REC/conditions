import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
import Tab from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };
describe('Components|SearchBar/Tab', () => {
  describe('', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Tab isFilter isActive onClick={noop} />);
    });
    shouldBehaveLikeAComponent(Tab, () => wrapper);

    test('must render a div', () => {
      expect(wrapper.find('.Tab')).toHaveLength(1);
    });

    test('must have a div with a className of iconSvg', () => {
      expect(wrapper.find('.iconSvg')).toHaveLength(1);
    });
  });

  describe('with filter prop', () => {
    test('with filter set to true, render  filterIcon', () => {
      const wrapper = shallow(<Tab isFilter isActive onClick={noop} />);
      expect(wrapper.find('.filterIcon')).toHaveLength(1);
    });

    test('with filter set to true, render filterText ', () => {
      const wrapper = shallow(<Tab isFilter isActive onClick={noop} />);
      const translationWrapper = wrapper
        .find('FormattedMessage')
        .shallowWithIntl();
      expect(translationWrapper.hasClass('filterText')).toBe(true);
    });

    test('with filter set to false, render findText ', () => {
      const wrapper = shallow(
        <Tab isFilter={false} isActive onClick={noop} />,
      );
      const translationWrapper = wrapper
        .find('FormattedMessage')
        .shallowWithIntl();
      expect(translationWrapper.hasClass('findText')).toBe(true);
    });

    test('with filter set to false,  render the searchIcon', () => {
      const wrapper = shallow(
        <Tab isFilter={false} isActive onClick={noop} />,
      );
      expect(wrapper.find('.findIcon')).toHaveLength(1);
    });
  });

  describe('with active prop', () => {
    test('set to true, render bottom border', () => {
      const wrapper = shallow(
        <Tab isFilter={false} isActive onClick={noop} />,
      );
      expect(wrapper.props().style.borderBottom).toBe('none');
    });
    test('set to false, render bottom border', () => {
      const wrapper = shallow(<Tab isFilter={false} isActive={false} onClick={noop} />);
      expect(wrapper.props().style.borderBottom).toBe('1px solid');
    });
  });
  describe('with onClick function', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(<Tab isFilter isActive onClick={spy} />);
    });
    test('should call its onClick prop once', () => {
      wrapper.find('.Tab').simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
