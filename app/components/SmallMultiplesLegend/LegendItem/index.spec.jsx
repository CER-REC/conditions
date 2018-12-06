import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import LegendItem from './';
import shared from '../shared.spec';

describe('Components|SmallMultiplesLegend/LegendItem', () => {
  let wrapper;
  const test = {};

  const itShouldRenderTitle = (title) => {
    it('should render the title', () => {
      expect(wrapper.text()).to.contain(title);
    });
  };

  const itShouldNotRenderGraph = () => {
    it('should not render the graph');
  };

  const itShouldRenderGraph = () => {
    it('should render the graph');
  };

  const itShouldRenderWithoutUnhighlight = () => {
    it('should render without the unhighlight class', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.hasClass('unhighlight')).to.be.false;
    });
  };

  const itShouldRenderWithUnhighlight = () => {
    it('should render with the unhighlight class', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.hasClass('unhighlight')).to.be.true;
    });
  };

  describe('when only the title property is provided', () => {
    const title = 'Test Title';

    beforeEach(() => {
      wrapper = shallow(<LegendItem className="test" title={title} />);
      test.wrapper = wrapper;
    });

    shared.shouldBehaveLikeAComponent(test, LegendItem, 'test');
    itShouldRenderTitle(title);
    itShouldNotRenderGraph();
    itShouldRenderWithoutUnhighlight();
  });

  describe('when the title and unhighlight property is provided', () => {
    const title = '123 ABC test_title';

    beforeEach(() => {
      wrapper = shallow(<LegendItem title={title} unhighlight />);
      test.wrapper = wrapper;
    });

    shared.shouldBehaveLikeAComponent(test, LegendItem, null);
    itShouldRenderTitle(title);
    itShouldNotRenderGraph();
    itShouldRenderWithUnhighlight();
  });

  describe('when the title and data property is provided', () => {
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
      wrapper = shallow(<LegendItem className="testclass" title={title} data={data} />);
      test.wrapper = wrapper;
    });

    shared.shouldBehaveLikeAComponent(test, LegendItem, 'testclass');
    itShouldRenderTitle(title);
    itShouldRenderGraph();
    itShouldRenderWithoutUnhighlight();
  });

  describe('when the title, data, and unhighlight property is provided', () => {
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
      wrapper = shallow(<LegendItem className="myClass" title={title} data={data} unhighlight />);
      test.wrapper = wrapper;
    });

    shared.shouldBehaveLikeAComponent(test, LegendItem, 'myClass');
    itShouldRenderTitle(title);
    itShouldRenderGraph();
    itShouldRenderWithUnhighlight();
  });
});
