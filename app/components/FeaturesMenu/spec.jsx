import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { FormattedMessage } from 'react-intl';

import FeaturesMenu from '.';
import List from '../List';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

describe('Components|FeaturesMenu', () => {
  let spy;
  let wrapper;

  beforeEach(() => {
    spy = sinon.spy();
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

    it('should render without the dropDown class', () => {
      expect(wrapper.hasClass('dropDown')).to.equal(false);
    });

    it('should render the trend title', () => {
      const titleWrapper = wrapper.find('.FeaturesMenu > FormattedMessage');

      expect(titleWrapper).to.have.lengthOf(1);
      expect(titleWrapper.prop('id')).to.equal('common.trend.title');
      // TODO: Test that the title renders with the title class
    });

    it('should render the features in the List component', () => {
      const listWrapper = wrapper.find(List);
      const items = listWrapper.prop('items');

      expect(listWrapper).to.have.lengthOf(1);
      expect(items).to.have.lengthOf(features.length);

      features.forEach((feature, index) => {
        expect(items[index].type).to.equal(FormattedMessage);
        expect(items[index].props.id).to.equal(`common.features.${feature}`);
      });
    });

    it('should render the List component with the first item selected', () => {
      expect(wrapper.find(List).prop('selected')).to.equal(0);
    });

    it('should call the onChange function with the feature on List item change', () => {
      features.forEach((feature, index) => {
        wrapper.find(List).prop('onChange')(index);

        expect(spy.calledWith(feature)).to.equal(true);
      });

      expect(spy.callCount).to.equal(features.length);
    });

    it('should render the List component with the corresponding item selected when selected is provided', () => {
      const selectedIndex = 2;

      wrapper = shallow((
        <FeaturesMenu
          features={features}
          onChange={spy}
          selected={features[selectedIndex]}
        />
      ));

      expect(wrapper.find(List).prop('selected')).to.equal(selectedIndex);
    });

    it('should render the List component with the first item selected when selected is invalid', () => {
      wrapper = shallow((
        <FeaturesMenu
          features={features}
          onChange={spy}
          selected="invalid"
        />
      ));

      expect(wrapper.find(List).prop('selected')).to.equal(0);
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

    it('should render with the dropDown class', () => {
      expect(wrapper.hasClass('dropDown')).to.equal(true);
    });

    it('should render the drop down title', () => {
      const titleWrapper = wrapper.find('.FeaturesMenu > FormattedMessage');

      expect(titleWrapper).to.have.lengthOf(1);
      expect(titleWrapper.prop('id')).to.equal('components.featureMenu.dropDownTitle');
      // TODO: Test that the title renders with the title class
    });

    it('should render the features in the select drop down', () => {
      const optionsWrapper = wrapper.find('select FormattedMessage');

      expect(optionsWrapper).to.have.lengthOf(features.length);

      features.forEach((feature, index) => {
        expect(optionsWrapper.at(index).prop('id')).to.equal(`common.features.${feature}`);
        // TODO: Test that the message renders a option element
      });
    });

    it('should render the select drop down with the first item selected', () => {
      expect(wrapper.find('select').prop('value')).to.equal(features[0]);
    });

    it('should not render any select option with a selected attribute', () => {
      const optionsWrapper = wrapper.find('option');

      for (let i = 0; i < optionsWrapper.length; i += 1) {
        expect(optionsWrapper.at(i).prop('selected')).to.equal(undefined);
      }
    });

    it('should call the onChange function with the feature on drop down item change', () => {
      features.forEach((feature) => {
        wrapper.find('select').simulate('change', { target: { value: feature } });

        expect(spy.calledWith(feature)).to.equal(true);
      });

      expect(spy.callCount).to.equal(features.length);
    });

    it('should render the select drop down with the corresponding item selected when selected is provided', () => {
      const selectedIndex = 1;

      wrapper = shallow((
        <FeaturesMenu
          features={features}
          onChange={spy}
          selected={features[selectedIndex]}
          dropDown
        />
      ));

      expect(wrapper.find('select').prop('value')).to.equal(features[selectedIndex]);
    });

    it('should render the select drop down with the first item selected when selected is invalid', () => {
      wrapper = shallow((
        <FeaturesMenu
          features={features}
          onChange={spy}
          selected=" "
          dropDown
        />
      ));

      expect(wrapper.find('select').prop('value')).to.equal(features[0]);
    });
  });
});
