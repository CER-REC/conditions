import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ProjectMenu from '../../components/ProjectMenu';
import FeaturesLegend from '../../components/FeaturesLegend';
import Wheel from '../../components/Wheel';
import { locationWheelData } from '../../components/Wheel/randomDataSample';
import './styles.scss';

const legendItems = [
  { color: 'pink', description: 'security', disabled: false },
  { color: 'green', description: 'financial', disabled: false },
  { color: 'blue', description: 'damagePrevention', disabled: false },
  { color: 'purple', description: 'socioEconomic', disabled: false },
];

const projectData = [
  {
    id: 1223,
    name: '1. Section 21.(1) application',
    graphData: [{ name: 'security', count: 5, color: 'pink' }, { name: 'managementSystem', count: 0, color: 'green' }],
  },
  {
    id: 1224,
    name: '2. Section 21.(1) application',
    graphData: [{ name: 'security', count: 10, color: 'pink' }, { name: 'managementSystem', count: 19, color: 'green' }],
  },
  {
    id: 1225,
    name: '3. Section 21.(1) application',
    graphData: [{ name: 'security', count: 4, color: 'pink' }, { name: 'managementSystem', count: 29, color: 'green' }],
  },
  {
    id: 1226,
    name: '4. Section 21.(1) application',
    graphData: [{ name: 'security', count: 6, color: 'pink' }, { name: 'managementSystem', count: 22, color: 'green' }],
  },
  {
    id: 1227,
    name: '5. Section 21.(1) application',
    graphData: [{ name: 'security', count: 5, color: 'pink' }, { name: 'managementSystem', count: 0, color: 'green' }],
  },
];

const ViewTwo = props => (
  <section className={classNames('ViewTwo', { layoutOnly: props.layoutOnly })}>
    <section className="searchHeader" />
    <section className="wheel">
      <Wheel
        ringType="Location"
        itemsData={locationWheelData}
      />
    </section>
    <section className="companyBreakdown">
      <ProjectMenu
        projectData={projectData}
        selectedProjectID={1225}
        onChange={() => {}}
        selectedFeature="theme"
      />
    </section>
    <section className="menus">
      <FeaturesLegend
        legendItems={legendItems}
        selectedFeature="theme"
        isProjectLegend
      />
    </section>
    <section className="conditions" />
  </section>
);

ViewTwo.propTypes = {
  layoutOnly: PropTypes.bool,
};

ViewTwo.defaultProps = {
  layoutOnly: false,
};

export default ViewTwo;
