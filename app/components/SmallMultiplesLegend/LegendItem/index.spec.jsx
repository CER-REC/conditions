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
      date: new Date('2018-01-01T00:00:00.000Z'),
      number: 12,
    }, {
      date: new Date('2018-01-02T00:00:00.000Z'),
      number: 1,
    }, {
      date: new Date('2018-01-03T00:00:00.000Z'),
      number: 345,
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
      date: new Date('2018-01-04T00:00:00.000Z'),
      number: 11,
    }, {
      date: new Date('2018-04-08T00:00:00.000Z'),
      number: 22,
    }, {
      date: new Date('2018-08-16T00:00:00.000Z'),
      number: 33,
    }];

    beforeEach(() => {
      wrapper = shallow(<LegendItem title={title} data={data} unhighlight />);
    });

    itShouldRenderTitle(title);
    itShouldRenderGraph();
    itShouldRenderWithUnhighlight();
  });
});
