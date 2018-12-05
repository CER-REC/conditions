import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import LegendItem from './';

describe('Components|SmallMultiplesLegend/LegendItem', () => {
  let wrapper;

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
      expect(wrapper.hasClass('LegendItem')).to.be.true;
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.hasClass('unhighlight')).to.be.false;
    });
  };

  const itShouldRenderWithUnhighlight = () => {
    it('should render with the unhighlight class', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.hasClass('LegendItem')).to.be.true;
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.hasClass('unhighlight')).to.be.true;
    });
  };

  describe('when only the title property is provided', () => {
    const title = 'Test Title';

    beforeEach(() => {
      wrapper = shallow(<LegendItem title={title} />);
    });

    itShouldRenderTitle(title);
    itShouldNotRenderGraph();
    itShouldRenderWithoutUnhighlight();
  });

  describe('when the title and unhighlight property is provided', () => {
    const title = '123 ABC test_title';

    beforeEach(() => {
      wrapper = shallow(<LegendItem title={title} unhighlight />);
    });

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
      wrapper = shallow(<LegendItem title={title} data={data} />);
    });

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
      wrapper = shallow(<LegendItem title={title} data={data} unhighlight />);
    });

    itShouldRenderTitle(title);
    itShouldRenderGraph();
    itShouldRenderWithUnhighlight();
  });
});
