import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import FeaturesMenu from '.';
import List from '../List';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

describe('Components|FeaturesMenu', () => {
  let spy;
  let wrapper;

  beforeEach(() => {
    spy = jest.fn();
    wrapper = shallow((
      <FeaturesMenu
        className="aClass"
        features={['TEST Feat.']}
        onChange={() => {}}
      />
    ));
  });

  shouldBehaveLikeAComponent(FeaturesMenu, () => wrapper);

  describe('when the dropDown property is not provided', () => {
    const features = ['Feature A', 'Feature B', 'Feature C'];

    beforeEach(() => {
      wrapper = shallow((
        <FeaturesMenu
          features={features}
          onChange={spy}
        />
      ));
    });

    test('should render without the dropDown class', () => {
      expect(wrapper.hasClass('dropDown')).toBe(false);
    });

    test('should render the trend title', () => {
      const titleWrapper = wrapper.find('.FeaturesMenu > FormattedMessage');

      expect(titleWrapper).toHaveLength(1);
      expect(titleWrapper.prop('id')).toBe('common.trend.title');
      expect(titleWrapper.shallowWithIntl().hasClass('title')).toBe(true);
    });

    test('should render the features in the List component', () => {
      const listWrapper = wrapper.find(List);
      const items = listWrapper.prop('items');

      expect(listWrapper).toHaveLength(1);
      expect(items).toHaveLength(features.length);

      features.forEach((feature, index) => {
        expect(items[index].type).toBe(FormattedMessage);
        expect(items[index].props.id).toBe(`common.features.${feature}`);
      });
    });

    test('should render the List component with the first item selected', () => {
      expect(wrapper.find(List).prop('selected')).toBe(0);
    });

    test('should call the onChange function with the feature on List item change', () => {
      features.forEach((feature, index) => {
        wrapper.find(List).prop('onChange')(index);
        expect(spy).toHaveBeenLastCalledWith(feature);
      });

      expect(spy).toHaveBeenCalledTimes(features.length);
    });

    test('should render the List component with the corresponding item selected when selected is provided', () => {
      const selectedIndex = 2;

      wrapper = shallow((
        <FeaturesMenu
          features={features}
          onChange={spy}
          selected={features[selectedIndex]}
        />
      ));

      expect(wrapper.find(List).prop('selected')).toBe(selectedIndex);
    });

    test('should render the List component with the first item selected when selected is invalid', () => {
      wrapper = shallow((
        <FeaturesMenu
          features={features}
          onChange={spy}
          selected="invalid"
        />
      ));

      expect(wrapper.find(List).prop('selected')).toBe(0);
    });
  });

  describe('when the dropDown property is provided', () => {
    const features = ['theme', 'phase', 'filing'];

    beforeEach(() => {
      wrapper = shallow((
        <FeaturesMenu
          features={features}
          onChange={spy}
          dropDown
        />
      ));
    });

    test('should render with the dropDown class', () => {
      expect(wrapper.hasClass('dropDown')).toBe(true);
    });

    test('should render the drop down title', () => {
      const titleWrapper = wrapper.find('.FeaturesMenu > FormattedMessage');

      expect(titleWrapper).toHaveLength(1);
      expect(titleWrapper.prop('id')).toBe('components.featureMenu.dropDownTitle');
      expect(titleWrapper.shallowWithIntl().hasClass('title')).toBe(true);
    });
  });
});
