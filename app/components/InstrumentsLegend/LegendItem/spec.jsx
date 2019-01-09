import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import LegendItem from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

describe('Components|InstrumentsLegend/LegendItem', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((
      <LegendItem
        className="testclass"
        title="Test Title"
        indicators={[]}
        color=""
      />
    ));
  });

  shouldBehaveLikeAComponent(LegendItem, () => wrapper);

  describe('when the all property is provided', () => {
    const title = '1';

    beforeEach(() => {
      wrapper = shallow((
        <LegendItem
          title={title}
          indicators={[]}
          color=""
          all
        />
      ));
    });

    it('should not render the indicators', () => {
      expect(wrapper.find('.indicator')).to.have.lengthOf(0);
    });

    it('should render the all title', () => {
      // TODO: Redo when translations are implemented
      expect(wrapper.text()).to.contain('All');
      expect(wrapper.text()).to.contain(title);
    });
  });

  describe('when there is no all property provided', () => {
    const title = 'abc';
    const color = 'black';
    const indicators = [true, false, true, false];

    beforeEach(() => {
      wrapper = shallow((
        <LegendItem
          className="testclass"
          title={title}
          indicators={indicators}
          color={color}
        />
      ));
    });

    it('should render the title', () => {
      expect(wrapper.find('.indicators')).to.have.lengthOf(1);
      expect(wrapper.text()).to.contain(title);
    });

    it('should render the indicators', () => {
      const indicatorsWrapper = wrapper.find('.indicators');

      expect(indicatorsWrapper.children()).to.have.lengthOf(indicators.length);

      indicators.forEach((indicator, index) => {
        const style = indicatorsWrapper.childAt(index).prop('style');

        if (indicator) {
          expect(style).to.deep.include({ backgroundColor: color });
        } else {
          expect(style).to.not.have.keys('backgroundColor');
        }
      });
    });
  });
});
