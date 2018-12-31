import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ProjectLegend from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

const legendItems = [
  { color: 'pink', description: 'test 1', disabled: true },
  { color: 'red', description: 'test 2', disabled: false },
  { color: 'green', description: 'test 3', disabled: false },
  { color: 'blue', description: 'test 4', disabled: false },
  { color: 'purple', description: 'test 5', disabled: false },
];

describe('Components|ProjectLegend', () => {
  const wrapper = shallow((
    <ProjectLegend legendItems={legendItems} />
  ));

  shouldBehaveLikeAComponent(wrapper, ProjectLegend, 'ProjectLegend');

  it('should contain five LegendItems', () => {
    expect(wrapper.find('LegendItem')).to.have.lengthOf(5);
  });
});
