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

  describe('when only the title property is provided', () => {
    const title = 'Test Title';

    beforeEach(() => {
      wrapper = shallow(<LegendItem title={title} />);
    });

    itShouldRenderTitle(title);

    it('should not render the graph');
  });

  describe('when only the data property is provided', () => {
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

    it('should render the graph');
  });
});
