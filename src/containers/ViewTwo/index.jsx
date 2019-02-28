import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ProjectMenu from '../../components/ProjectMenu';
import FeaturesLegend from '../../components/FeaturesLegend';
import Wheel from '../../components/Wheel';
import BrowseByBtn from '../../components/BrowseByBtn';
import { companyWheelData } from '../../components/Wheel/randomDataSample';
import { browseByType } from '../../proptypes';
import * as selectedCreators from '../../actions/selected';
import './styles.scss';

const legendItems = [
  { feature: 'theme', description: 'SECURITY', disabled: false },
  { feature: 'theme', description: 'FINANCIAL', disabled: false },
  { feature: 'theme', description: 'DAMAGE_PREVENTION', disabled: false },
  { feature: 'theme', description: 'SOCIO_ECONOMIC', disabled: false },
];

const projectData = [
  {
    id: 1223,
    name: '1. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 5 }, { name: 'MANAGEMENT_SYSTEM', count: 0 }],
  },
  {
    id: 1224,
    name: '2. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 10 }, { name: 'MANAGEMENT_SYSTEM', count: 19 }],
  },
  {
    id: 1225,
    name: '3. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 4 }, { name: 'MANAGEMENT_SYSTEM', count: 29 }],
  },
  {
    id: 1226,
    name: '4. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 6 }, { name: 'MANAGEMENT_SYSTEM', count: 22 }],
  },
  {
    id: 1227,
    name: '5. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 5 }, { name: 'MANAGEMENT_SYSTEM', count: 0 }],
  },
];

const ViewTwo = props => (
  <section className={classNames('ViewTwo', { layoutOnly: props.layoutOnly })}>
    <section className="row">
      <section className="searchHeader" />
    </section>
    <section className="row">
      <section className="wheel">
        <Wheel
          wheelType={props.browseBy}
          itemsData={companyWheelData}
          selectRay={props.selectRay}
        />
        <BrowseByBtn mode="company" onClick={props.setBrowseBy} />
        <BrowseByBtn mode="location" onClick={props.setBrowseBy} />
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
  </section>
);

ViewTwo.propTypes = {
  layoutOnly: PropTypes.bool,
  browseBy: browseByType.isRequired,
  setBrowseBy: PropTypes.func.isRequired,
};

ViewTwo.defaultProps = {
  layoutOnly: false,
};

export const ViewTwoUnconnected = ViewTwo;

export default connect(
  ({ selected }) => ({
    selected,
  }),
  {
    setSelectedCompany: selectedCreators.setSelectedCompany,
  },
)(ViewTwo);

