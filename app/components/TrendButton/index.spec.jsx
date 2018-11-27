import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import TrendButton from './';
import StreamButton from './images/streamButton.png';
import BubbleButton from './images/bubbleButton.png';

const defaultFunction = () => {};
const eventFuncs = { preventDefault: defaultFunction, stopPropagation: defaultFunction };


describe('Components|TrendButton', () => {
  describe('without a selectedFeature', () => {
    it('should not render anything', () => {
      const wrapper = shallow(<TrendButton selectedFeature="" onClick={defaultFunction} />);
      expect(wrapper.type()).to.equal(null);
    });
  });

  describe('with a selectedFeature', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<TrendButton selectedFeature="Theme" onClick={defaultFunction} />);
    });
    it('should render a button', () => {
      expect(wrapper.find('button')).to.have.lengthOf(1);
    });
    it('should render a div with a className of trendButton', () => {
      expect(wrapper.find('div.trendButton')).to.have.lengthOf(1);
    });
    it('should render a div with a className of buttonText', () => {
      expect(wrapper.find('div.buttonText')).to.have.lengthOf(1);
    });

    it('should render a span for button text', () => {
      expect(wrapper.find('span')).to.have.lengthOf(1);
    });
  });

  describe('when a trendButton is clicked', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<TrendButton selectedFeature="Theme" onClick={spy} />);
    });
    it("should call it's onClick prop", () => {
      wrapper.find('button').simulate('click', eventFuncs);
      expect(spy.called).to.equal(true);
    });

    it("should call it's onClick prop when enter is pressed", () => {
      wrapper.find('button').simulate('keypress', { key: 'Enter', ...eventFuncs });
      expect(spy.called).to.equal(true);
    });
  });

  describe('if streamGraph available', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<TrendButton selectedFeature="Theme" streamGraphData="[1,2,3]" onClick={defaultFunction} />);
    });

    it('renders StreamGraph component correctly', () => {
      expect(wrapper.find('StreamGraph')).to.have.lengthOf(1);
    });
    it('renders a div with a className of streamGraphBackground', () => {
      expect(wrapper.find('div.streamGraphBackground')).to.have.lengthOf(1);
    });
  });

  describe('if streamGraph not available', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<TrendButton selectedFeature="Theme" onClick={defaultFunction} />);
    });

    it('renders a div with a className of staticBackground', () => {
      expect(wrapper.find('div.staticBackground')).to.have.lengthOf(1);
    });

    it('renders an image tag', () => {
      expect(wrapper.find('img')).to.have.lengthOf(1);
    });
  });

  describe('if streamGraph not available and Instrument is selected', () => {
    it('has image source of BubbleButton', () => {
      const wrapper = shallow(<TrendButton selectedFeature="Instrument" onClick={defaultFunction} />);
      expect(wrapper.find('img').prop('src')).equal(BubbleButton);
    });
  });

  describe('if streamGraph not available and anything other than Instrument is selected', () => {
    it('has image source of StreamButton', () => {
      const wrapper = shallow(<TrendButton selectedFeature="Phase" onClick={defaultFunction} />);
      expect(wrapper.find('img').prop('src')).equal(StreamButton);
    });
  });
});
