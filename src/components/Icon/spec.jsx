import React from 'react';
import { shallow } from 'enzyme';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Icon from '.';

describe('Component|Icon', () => {
  library.add(
    faGoogle,
    faArchive,
  );
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Icon icon="archive" />);
    });

    test('should render', () => {
      expect(wrapper.find('.Icon')).toHaveLength(1);
    });

    test('should contain a single child of a FontAwesomeIcon element', () => {
      expect(wrapper.find('.Icon').children()).toHaveLength(1);
      expect(wrapper.find('FontAwesomeIcon')).toHaveLength(1);
    });
  });
  describe('with default props', () => {
    test('should accept a prop to override the style', () => {
      const wrapper = shallow(<Icon icon="archive" className="test" />);
      expect(wrapper.find('FontAwesomeIcon').props().className).toBe('test');
    });

    test('should accept a prop for size', () => {
      const wrapper = shallow(<Icon icon="archive" size="sm" />);
      expect(wrapper.find('FontAwesomeIcon').props().size).toBe('sm');
    });

    test('should accept a prop for a prefix for brand icons', () => {
      const wrapper = shallow(<Icon icon="google" prefix="fab" />);
      expect(wrapper.find('FontAwesomeIcon').props().icon[0]).toBe('fab');
      expect(wrapper.find('FontAwesomeIcon').props().icon[1]).toBe('google');
    });

    test('should accept a prop for color', () => {
      const wrapper = shallow(<Icon icon="archive" color="red" />);
      expect(wrapper.find('FontAwesomeIcon').props().color).toBe('red');
    });
  });
});
