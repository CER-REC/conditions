import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

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
      name: 'Project Name 5',
      graphData: [{ name: 'condition 1', count: 5 }, { name: 'condition 2', count: 0 }],
    },
    {
      id: 1228,
      name: 'Project Name 6',
      graphData: [{ name: 'condition 1', count: 10 }, { name: 'condition 2', count: 19 }],
    },
    {
      id: 1229,
      name: 'Project Name 7',
      graphData: [{ name: 'condition 1', count: 4 }, { name: 'condition 2', count: 29 }],
    },
    {
      id: 1230,
      name: 'Project Name 8',
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

    it('should pass an array of projects to the List', () => {
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
      expect(wrapper.find('Legend')).has.lengthOf(1);
    });

    it('should pass the Legend an array of legend items', () => {
      expect(wrapper.find('Legend').props().items).to.be.a('array');
    });
  });

  // expectedResults is the input coming into the project menu
  // and the output to the list component
  // [0] input, [1] output
  const expectedResults = [
    [{ total: 8, selected: 0, clickedIndex: 2 }, { total: 3, selected: 0, projectID: 1225 }],
    [{ total: 8, selected: 1, clickedIndex: 3 }, { total: 4, selected: 1, projectID: 1226 }],
    [{ total: 8, selected: 2, clickedIndex: 4 }, { total: 5, selected: 2, projectID: 1227 }],
    [{ total: 8, selected: 3, clickedIndex: 1 }, { total: 5, selected: 2, projectID: 1225 }],
    [{ total: 8, selected: 4, clickedIndex: 0 }, { total: 5, selected: 2, projectID: 1225 }],
    [{ total: 8, selected: 5, clickedIndex: 4 }, { total: 5, selected: 2, projectID: 1230 }],
    [{ total: 8, selected: 6, clickedIndex: 1 }, { total: 4, selected: 2, projectID: 1228 }],
    [{ total: 8, selected: 7, clickedIndex: 0 }, { total: 3, selected: 2, projectID: 1228 }],
    [{ total: 3, selected: 2, clickedIndex: 1 }, { total: 3, selected: 2, projectID: 1224 }],
    [{ total: 3, selected: 1, clickedIndex: 2 }, { total: 3, selected: 1, projectID: 1225 }],
    [{ total: 4, selected: 1, clickedIndex: 1 }, { total: 4, selected: 1, projectID: 1224 }],
    [{ total: 6, selected: 5, clickedIndex: 2 }, { total: 3, selected: 2, projectID: 1228 }],
  ];

  for (let i = 0; i < expectedResults.length; i += 1) {
    const [input, output] = expectedResults[i];
    describe(`with index ${input.selected} selected of ${input.total} projects`, () => {
      let onChange;
      let wrapper;
      beforeEach(() => {
        onChange = sinon.spy();
        wrapper = shallow(<ProjectMenu
          projectData={projectData.slice(0, input.total)}
          selectedProjectID={projectData[input.selected].id}
          onChange={onChange}
          selectedFeature="Theme"
        />);
      });

      it(`should pass the List ${output.total} projects`, () => {
        expect(wrapper.find('List').props().items).to.have.a.lengthOf(output.total);
      });

      it(`should pass the List a selected project index of ${output.selected}`, () => {
        expect(wrapper.find('List').props().selected).to.equal(output.selected);
      });

      it(`should pass ${output.projectID} when List has a selected index of ${input.clickedIndex}`, () => {
        wrapper.find('List').props().onChange(input.clickedIndex);
        expect(onChange.calledOnce).to.equal(true);
        expect(onChange.firstCall.args).to.deep.equal([output.projectID]);
      });
    });
  }
});
