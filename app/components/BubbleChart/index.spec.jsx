import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import BubbleChart from './';

const noop = () => {};

describe('Components|BubbleChart', () => {
  describe('without a selectedCategory equal to Instrument', () => {
    it('should not render a div', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="test" width={1000} height={1500} />);
      expect(wrapper.type()).to.equal(null);
    });
  });
  describe('with a selectedCategory', () => {
    it('should render a div', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="instrument" width={1000} height={1500} />);
      expect(wrapper.type()).to.equal('div');
    });

    it('should render a bubbleChart class', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="instrument" onChange={noop} width={1000} height={1500} />);
      expect(wrapper.find('.bubbleChart')).to.have.lengthOf(1);
    });
  });
  // describe('without a selectedCategory equal to Instrument', () => {
  //   it('should find an svg tag', () => {
  //     const wrapper = mount(<BubbleChart selectedCategory="test" width={1000} height={1500} />);
  //     console.log(wrapper.debug());
  //     // expect(wrapper.find('svg')).to.have.lengthOf(1);
  //   });
  // });
});
//   describe('with an width/height props', () => {
//     it('should render an svg of width equal to availableSpace', () => {
//       const wrapper = shallow(<BubbleChart selectedCategory="instrument" width={1000} height={1500} />);
//       // expect(wrapper.find('svg').prop('width')).to.equal(1000);
//     });

//     it('should render an svg of height equal to availableSpace', () => {
//       const wrapper = shallow(<BubbleChart selectedCategory="instrument" width={1000} height={1500} />);
//       // expect(wrapper.find('svg').prop('height')).to.equal(1500);
//     });
//   });

//   describe('with EnergyBubbleData being passed in', () => {
//     it('should render a circle', () => {
//       const wrapper = shallow(<BubbleChart selectedCategory="instrument" width={1000} height={1500} energyBubbleData={energyBubbleData} />);
//       // expect(wrapper.find('circle')).to.have.lengthOf(1);
//     });
//   });
// });
