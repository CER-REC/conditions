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

  const selectedProjectID = 1226;
  const noop = () => {};
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectMenu
        projectData={projectData}
        selectedProjectID={selectedProjectID}
        onChange={noop}
        selectedFeature="Phase"
      />);
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

    it('should pass down a maximum of 5 projects to the List', () => {
      const list = wrapper.find('List');
      expect(list.props().items).to.have.lengthOf(5);
    });

    it('should pass the List the index of the selected project', () => {
      expect(wrapper.find('List').props().selected).to.equal(2);
    });

    it('should pass down an onChange function to the List', () => {
      const list = wrapper.find('List');
      expect(list.props().onChange).to.be.a('function');
    });

    it('should display a legend for the projects', () => {
      expect(wrapper.find('ProjectLegend')).has.lengthOf(1);
    });

    it('should pass the ProjectLegend a feature item', () => {
      expect(wrapper.find('ProjectLegend').props().legendType).to.be.a('string');
    });
  });

  // expectedResults is the input coming into the project menu
  // and the output to the list component
  // [0] input, [1] output
  const expectedResults = [
    [{ total: 8, selected: 0 }, { total: 3, selected: 0 }],
    [{ total: 8, selected: 1 }, { total: 4, selected: 1 }],
    [{ total: 8, selected: 2 }, { total: 5, selected: 2 }],
    [{ total: 8, selected: 3 }, { total: 5, selected: 2 }],
    [{ total: 8, selected: 4 }, { total: 5, selected: 2 }],
    [{ total: 8, selected: 5 }, { total: 5, selected: 2 }],
    [{ total: 8, selected: 6 }, { total: 4, selected: 2 }],
    [{ total: 8, selected: 7 }, { total: 3, selected: 2 }],
    [{ total: 3, selected: 2 }, { total: 3, selected: 2 }],
    [{ total: 3, selected: 1 }, { total: 3, selected: 1 }],
    [{ total: 4, selected: 1 }, { total: 4, selected: 1 }],
    [{ total: 6, selected: 5 }, { total: 3, selected: 2 }],
  ];

  for (let i = 0; i < expectedResults.length; i += 1) {
    const [input, output] = expectedResults[i];
    describe(`with index ${input.selected} selected of ${input.total} projects`, () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(<ProjectMenu
          projectData={projectData.slice(0, input.total)}
          selectedProjectID={projectData[input.selected].id}
          onChange={noop}
          selectedFeature="Theme"
        />);
      });

      it(`should pass the List ${output.total} projects`, () => {
        expect(wrapper.find('List').props().items).to.have.a.lengthOf(output.total);
      });

      it(`should pass the List a selected project index of ${output.selected}`, () => {
        expect(wrapper.find('List').props().selected).to.equal(output.selected);
      });
    });
  }
});
