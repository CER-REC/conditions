import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import FeaturesMenu from './';
import List from '../List';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

describe('Components|FeaturesMenu', () => {
  let spy;
  let wrapper = shallow((
    <FeaturesMenu
      className="aClass"
      title="Title A"
      features={['TEST Feat.']}
      onChange={() => {}}
    />
  ));

  beforeEach(() => {
    spy = sinon.spy();
  });

  shouldBehaveLikeAComponent(wrapper, FeaturesMenu, 'aClass');

  describe('when the dropDown property is not provided', () => {
    const title = 'a title';
    const features = ['Feature A', 'Feature B', 'Feature C'];

    beforeEach(() => {
      wrapper = shallow((
        <FeaturesMenu
          title={title}
          features={features}
          onChange={spy}
        />
      ));
    });

    it('should render without the dropDown class', () => {
      expect(wrapper.hasClass('dropDown')).to.equal(false);
    });

    it('should render the title', () => {
      const titleWrapper = wrapper.find('.title');

      expect(titleWrapper).to.have.lengthOf(1);
      expect(titleWrapper.text()).to.contain(title);
    });

    it('should render the features in the List component', () => {
      const listWrapper = wrapper.find(List);

      expect(listWrapper).to.have.lengthOf(1);
      expect(listWrapper.prop('items')).to.deep.equal(features);
    });

    it('should call the onChange function with the feature on List item change', () => {
      features.forEach((feature, index) => {
        wrapper.find(List).prop('onChange')(index);

        expect(spy.calledWith(feature)).to.equal(true);
      });

      expect(spy.callCount).to.equal(features.length);
    });
  });

  describe('when the dropDown property is provided', () => {
    const title = '2';
    const features = ['FEATURE', 'FEATURE_2', 'FEATURE_3'];

    beforeEach(() => {
      wrapper = shallow((
        <FeaturesMenu
          title={title}
          features={features}
          onChange={spy}
          dropDown
        />
      ));
    });

    it('should render with the dropDown class', () => {
      expect(wrapper.hasClass('dropDown')).to.equal(true);
    });

    it('should render the features in the select drop down', () => {
      const optionsWrapper = wrapper.find('select > option');

      features.forEach((feature, index) => {
        expect(optionsWrapper.at(index).text()).to.contain(feature);
      });
    });

    it('should call the onChange function with the feature on drop down item change', () => {
      features.forEach((feature) => {
        wrapper.find('select').simulate('change', { target: { value: feature } });

        expect(spy.calledWith(feature)).to.equal(true);
      });

      expect(spy.callCount).to.equal(features.length);
    });
  });
});
