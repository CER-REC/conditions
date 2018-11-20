import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ProjectMenu from './';

describe('Components|ProjectMenu', () => {
  // Assuming that the actual graph data will have a filter coming from the view level
  // graph data being the subset of data filtered by the <FeaturedMenu /> state
  // Project name will be in either french or english depending on view state
  const projectData = [
    {
      id: 1223,
      name: 'Project Name 1',
      graphData: [{ name: 'condition 1', count: 5 }, { name: 'condition 2', count: 0 }],
    },
    {
      id: 1224,
      name: 'Project Name 2',
      graphData: [{ name: 'condition 1', count: 10 }, { name: 'condition 2', count: 19 }],
    },
    {
      id: 1225,
      name: 'Project Name 3',
      graphData: [{ name: 'condition 1', count: 4 }, { name: 'condition 2', count: 29 }],
    },
    {
      id: 1226,
      name: 'Project Name 4',
      graphData: [{ name: 'condition 1', count: 6 }, { name: 'condition 2', count: 22 }],
    },
    {
      id: 1227,
      name: 'Project Name 1',
      graphData: [{ name: 'condition 1', count: 5 }, { name: 'condition 2', count: 0 }],
    },
    {
      id: 1228,
      name: 'Project Name 2',
      graphData: [{ name: 'condition 1', count: 10 }, { name: 'condition 2', count: 19 }],
    },
    {
      id: 1229,
      name: 'Project Name 3',
      graphData: [{ name: 'condition 1', count: 4 }, { name: 'condition 2', count: 29 }],
    },
    {
      id: 1230,
      name: 'Project Name 4',
      graphData: [{ name: 'condition 1', count: 6 }, { name: 'condition 2', count: 22 }],
    },
  ];

  describe('with default props', () => {
    // TODO: Change this test to "should render virtualized projects if projectData is empty"
    it('should not render', () => {
      const wrapper = shallow(<ProjectMenu />);
      expect(wrapper.type()).to.equal(null);
    });
  });

  describe('with passed down project data', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectMenu projectData={projectData} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a ProjectMenu class', () => {
      expect(wrapper.is('.ProjectMenu')).to.equal(true);
    });

    it('should contain 1 List component', () => {
      expect(wrapper.find('List')).has.lengthOf(1);
    });

    it('should pass an array to the Lists project proptype', () => {
      const list = wrapper.find('List');
      expect(list.props().items).to.be.a('array');
    });

    it('should pass down a maximum of 6 projects to the List', () => {
      const list = wrapper.find('List');
      expect(list.props().items).to.have.lengthOf(6);
    });

    it('should pass down an onChange function to the List', () => {
      const list = wrapper.find('List');
      expect(list.props().onChange).to.be.a('function');
    });

    it('should should display a legend for the projects', () => {
      expect(wrapper.find('ProjectLegend')).has.lengthOf(1);
    });
  });
});
