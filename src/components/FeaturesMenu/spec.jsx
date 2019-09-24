import React from 'react';
import { shallow } from 'enzyme';

import FeaturesMenu from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import { features as featuresRaw } from '../../constants';

const features = Object.keys(featuresRaw);

const i18nToFeature = id => id.replace('common.features.', '');

describe('Components|FeaturesMenu', () => {
  let spy;
  let wrapper;

  beforeEach(() => {
    spy = jest.fn();
    wrapper = shallow((
      <FeaturesMenu
        className="aClass"
        onChange={() => {}}
      />
    ));
  });

  shouldBehaveLikeAComponent(FeaturesMenu, () => wrapper);

  describe('when the dropDown property is not provided', () => {
    beforeEach(() => {
      wrapper = shallow(<FeaturesMenu onChange={spy} />);
    });

    test('should render without the dropDown class', () => {
      expect(wrapper.hasClass('dropDown')).toBe(false);
    });

    test('should render the trend title', () => {
      const titleWrapper = wrapper.find('.FeaturesMenu > AdvancedFormattedMessage');

      expect(titleWrapper).toHaveLength(1);
      expect(titleWrapper.prop('id')).toBe('common.trend.title');
      expect(titleWrapper.shallowWithIntl().shallowWithIntl().hasClass('title')).toBe(true);
    });

    test('should render the features in the List component', () => {
      const listWrapper = wrapper.find('List');
      const items = listWrapper.prop('items');

      expect(listWrapper).toHaveLength(1);
      expect(items).toHaveLength(features.length);

      const missing = items
        .map(v => i18nToFeature(v.props.id))
        .reduce((acc, next) => acc.filter(v => v !== next), features);
      expect(missing).toHaveLength(0);
    });

    test('should render the List component with the first item selected', () => {
      expect(wrapper.find('List').prop('selected')).toBe(0);
    });

    test('should call the onChange function with the feature on List item change', () => {
      const list = wrapper.find('List');
      const desired = i18nToFeature(list.prop('items')[3].props.id);

      list.prop('onChange')(3, {});
      expect(spy).toHaveBeenLastCalledWith(desired);
    });

    test('should render the List component with the corresponding item selected when selected is provided', () => {
      const itemOrder = wrapper.find('List').prop('items')
        .map(v => i18nToFeature(v.props.id));
      features.forEach((selected) => {
        wrapper.setProps({ selected });
        expect(wrapper.find('List').prop('selected')).toBe(itemOrder.indexOf(selected));
      });
    });

    test('should render the List component with the first item selected when selected is invalid', () => {
      wrapper = shallow((
        <FeaturesMenu
          features={features}
          onChange={spy}
          selected="invalid"
        />
      ));

      expect(wrapper.find('List').prop('selected')).toBe(0);
    });
  });

  describe('when the dropDown property is provided', () => {
    beforeEach(() => {
      wrapper = shallow(<FeaturesMenu onChange={spy} dropDown />);
    });

    test('should render with the dropDown class', () => {
      expect(wrapper.hasClass('dropDown')).toBe(true);
    });

    test('should render the drop down title', () => {
      const titleWrapper = wrapper.find('.FeaturesMenu > AdvancedFormattedMessage');

      expect(titleWrapper).toHaveLength(1);
      expect(titleWrapper.prop('id')).toBe('components.featureMenu.dropDownTitle');
      expect(titleWrapper.shallowWithIntl().shallowWithIntl().hasClass('title')).toBe(true);
    });
  });
});
