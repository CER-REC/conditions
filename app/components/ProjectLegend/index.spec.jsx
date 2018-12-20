import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ProjectLegend from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

describe('Components|ProjectLegend', () => {
  const wrapper = shallow((
    <ProjectLegend />
  ));

  shouldBehaveLikeAComponent(wrapper, ProjectLegend, 'ProjectLegend');

  it('should contain a LegendItem', () => {
    expect(wrapper.find('LegendItem')).to.equal(true);
  });
});
