import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FormattedMessage } from 'react-intl';
import { VictoryArea } from 'victory';

import LegendItem from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

describe('Components|SmallMultiplesLegend/LegendItem', () => {
  let wrapper = shallow((
    <LegendItem
      className="testtest"
      title="Test Title"
      feature="Feat."
      data={[]}
      color=""
      max={0}
    />
  ));

  shouldBehaveLikeAComponent(LegendItem, () => wrapper);

  describe('when the all property is provided', () => {
    const title = 'a1';

    beforeEach(() => {
      wrapper = shallow((
        <LegendItem
          title={title}
          feature={title}
          data={[]}
          color=""
          max={0}
          all
        />
      ));
    });

    it('should not render the graph', () => {
      expect(wrapper.find(VictoryArea)).to.have.lengthOf(0);
    });

    it('should render with the all class', () => {
      expect(wrapper.hasClass('all')).to.equal(true);
    });

    it('should render the formatted all title', () => {
      const id = `components.smallMultiplesLegend.all.${title}`;

      expect(wrapper.find(FormattedMessage).prop('id')).to.equal(id);
    });
  });

  describe('when there is no all property provided', () => {
    const title = '(<{}>)other_test-title.!?';
    const feature = 'test feature';
    const color = 'red';
    const max = 500;
    const data = [{
      date: 2018,
      count: 12,
    }, {
      date: 2019,
      count: 1,
    }, {
      date: 2020,
      count: 345,
    }];

    beforeEach(() => {
      wrapper = shallow((
        <LegendItem
          className="testclass"
          title={title}
          feature={feature}
          data={data}
          color={color}
          max={max}
        />
      ));
    });

    it('should render the formatted title', () => {
      const id = `common.${feature}.${title}`;

      expect(wrapper.find('.stream')).to.have.lengthOf(1);
      expect(wrapper.find(FormattedMessage).prop('id')).to.equal(id);
    });

    it('should render the graph', () => {
      const victoryAreaWrapper = wrapper.find(VictoryArea);

      expect(victoryAreaWrapper).to.have.lengthOf(1);
      expect(victoryAreaWrapper.prop('maxDomain')).to.deep.equal({ y: max });
      expect(victoryAreaWrapper.prop('style')).to.deep.equal({ data: { fill: color } });

      data.forEach((condition) => {
        expect(victoryAreaWrapper.prop('data')).to.deep.include({ x: condition.date, y: condition.count });
      });
    });

    it('should render without the all class', () => {
      expect(wrapper.hasClass('all')).to.equal(false);
    });

    it('should render without the faded class', () => {
      expect(wrapper.hasClass('faded')).to.equal(false);
    });

    it('should render with the faded class when the faded property is provided', () => {
      wrapper = shallow((
        <LegendItem
          className="myClass"
          title={title}
          feature={feature}
          data={data}
          color="#AACC11"
          max={0}
          faded
        />
      ));

      expect(wrapper.hasClass('faded')).to.equal(true);
    });
  });
});
