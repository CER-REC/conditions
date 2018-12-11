import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { VictoryArea } from 'victory';

import LegendItem from './';
import shared from '../shared.spec';

describe('Components|SmallMultiplesLegend/LegendItem', () => {
  let wrapper;
  const test = {};

  const shouldRenderTitle = (title) => {
    it('should render the title', () => {
      expect(wrapper.text()).to.contain(title);
    });
  };

  const shouldNotRenderGraph = () => {
    it('should not render the graph', () => {
      expect(wrapper.find('.stream')).to.have.lengthOf(0);
      expect(wrapper.find(VictoryArea)).to.have.lengthOf(0);
    });
  };

  const shouldRenderGraph = (data, color, max) => {
    it('should render the graph', () => {
      const victoryAreaWrapper = wrapper.find(VictoryArea);

      expect(wrapper.find('.stream')).to.have.lengthOf(1);
      expect(victoryAreaWrapper).to.have.lengthOf(1);
      expect(victoryAreaWrapper.prop('maxDomain')).to.deep.equal({ y: max });
      expect(victoryAreaWrapper.prop('style')).to.deep.equal({ data: { fill: color } });

      data.forEach((condition) => {
        expect(victoryAreaWrapper.prop('data')).to.deep.include({ x: condition.date, y: condition.count });
      });
    });
  };

  const shouldRenderWithoutAll = () => {
    it('should render without the all class', () => {
      expect(wrapper.hasClass('all')).to.equal(false);
    });
  };

  const shouldRenderWithAll = () => {
    it('should render with the all class', () => {
      expect(wrapper.hasClass('all')).to.equal(true);
    });
  };

  const shouldRenderWithoutFaded = () => {
    it('should render without the faded class', () => {
      expect(wrapper.hasClass('faded')).to.equal(false);
    });
  };

  const shouldRenderWithFaded = () => {
    it('should render with the faded class', () => {
      expect(wrapper.hasClass('faded')).to.equal(true);
    });
  };

  describe('when the all property is provided', () => {
    const title = 'Test Title';

    beforeEach(() => {
      wrapper = shallow(<LegendItem className="test" title={title} data={[]} color="" max={0} all />);
      test.wrapper = wrapper;
    });

    shared.shouldBehaveLikeAComponent(test, LegendItem, 'test');
    shouldRenderTitle(title);
    shouldNotRenderGraph();
    shouldRenderWithAll();
    shouldRenderWithoutFaded();
  });

  describe('when the all and faded property is provided', () => {
    const title = '123 ABC test_title';

    beforeEach(() => {
      wrapper = shallow(<LegendItem title={title} data={[]} color="" max={0} all faded />);
      test.wrapper = wrapper;
    });

    shared.shouldBehaveLikeAComponent(test, LegendItem, null);
    shouldRenderTitle(title);
    shouldNotRenderGraph();
    shouldRenderWithAll();
    shouldRenderWithFaded();
  });

  describe('when there is no all property provided', () => {
    const title = '(<{}>)other_test-title.!?';
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
      wrapper = shallow(<LegendItem className="testclass" title={title} data={data} color="red" max={500} />);
      test.wrapper = wrapper;
    });

    shared.shouldBehaveLikeAComponent(test, LegendItem, 'testclass');
    shouldRenderTitle(title);
    shouldRenderGraph(data, 'red', 500);
    shouldRenderWithoutAll();
    shouldRenderWithoutFaded();
  });

  describe('when there is no all property, and the faded property is provided', () => {
    const title = '';
    const data = [{
      date: 1999,
      count: 11,
    }, {
      date: 2002,
      count: 22,
    }, {
      date: 2011,
      count: 33,
    }];

    beforeEach(() => {
      wrapper = shallow(<LegendItem className="myClass" title={title} data={data} color="#AACC11" max={0} faded />);
      test.wrapper = wrapper;
    });

    shared.shouldBehaveLikeAComponent(test, LegendItem, 'myClass');
    shouldRenderTitle(title);
    shouldRenderGraph(data, '#AACC11', 0);
    shouldRenderWithoutAll();
    shouldRenderWithFaded();
  });
});
