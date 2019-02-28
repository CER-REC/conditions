import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ProjectMenu from '../../components/ProjectMenu';
import FeaturesLegend from '../../components/FeaturesLegend';
import Wheel from '../../components/Wheel';
import BrowseByBtn from '../../components/BrowseByBtn';
import { companyWheelData } from '../../components/Wheel/randomDataSample';
import ConditonDetails from '../../components/ConditionDetails';
import TrendButton from '../../components/TrendButton';
import { browseByType } from '../../proptypes';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import * as browseByCreators from '../../actions/browseBy';
import * as selectedCreators from '../../actions/selected';
import * as searchCreators from '../../actions/search';
import { conditionCountsByYear, conditionCountsByCommodity, searchData } from '../../mockData';
import './styles.scss';
import data from '../../components/ConditionDetails/testData';

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

const features = ['theme', 'instrument', 'phase', 'type', 'status', 'filing'];

// SearchBar
const availableCategories = ['all', 'oversight & safety', 'environment', 'administration & filings'];

const defaultProps = {
  data,
  selectedProject: 'Keystone XL',
  searchKeywords: {
    include: ['hello'],
  },
  // selectedItem: { instrumentIndex: 1, itemIndex: -1 },
  openProjectDetails: project => alert(`Project details for: ${project}`),
  openIntermediatePopup: instrumentNumber => alert(`Intermediate popup for: ${instrumentNumber}`),
};

const ViewTwo = props => (
  <section className={classNames('ViewTwo', { layoutOnly: props.layoutOnly })}>
    <section className="row">
      <section className="searchHeader">
        <SearchBar
          suggestedKeywords={searchData}
          availableYearRange={props.availableProjectYear}
          availableCategories={availableCategories}
          updateKeywords={() => {}}
          findAnyOnChange={props.setFindAny}
          updateYear={props.setProjectYear}
          changeProjectStatus={props.setProjectStatus}
          includeKeywords={['safety']}
          excludeKeywords={['emissions']}
          projectStatus={props.projectStatus}
          yearRange={props.projectYear}
          findAny={props.findAny}
        />
      </section>
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
        <TrendButton
          onClick={() => {}}
          feature="theme"
          subFeature=""
          projectData={conditionCountsByYear.counts}
          instrumentData={conditionCountsByCommodity.counts}
        />
        <Dropdown
          options={features}
          onChange={() => {}}
          optionID="common.features"
        />
        <FeaturesLegend
          legendItems={legendItems}
          selectedFeature="theme"
          isProjectLegend
        />
      </section>
      <section className="conditions">
        <ConditonDetails {...defaultProps} />
      </section>
    </section>
  </section>
);

ViewTwo.propTypes = {
  layoutOnly: PropTypes.bool,
  browseBy: browseByType.isRequired,
  setBrowseBy: PropTypes.func.isRequired,
  availableProjectYear: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  setFindAny: PropTypes.func.isRequired,
  setProjectYear: PropTypes.func.isRequired,
  projectStatus: PropTypes.arrayOf(PropTypes.string).isRequired,
  yearRange: PropTypes.arrayOf(PropTypes.string).isRequired,
  findAny: PropTypes.bool.isRequired,
  selectRay: PropTypes.string.isRequired,
  projectYear: PropTypes.number.isRequired,
  setProjectStatus: PropTypes.func.isRequired,
};

ViewTwo.defaultProps = {
  layoutOnly: false,
};

export const ViewTwoUnconnected = ViewTwo;

export default connect(
  ({
    selected,
    browseBy,
    search,
  }) => ({
    selected,
    browseBy,
    included: search.included,
    projectStatus: search.projectStatus,
    findAny: search.findAny,
    projectYear: search.projectYear,
    excluded: search.excluded,
    availableProjectYear: search.availableProjectYear,
  }),
  {
    setSelectedCompany: selectedCreators.setSelectedCompany,
    setBrowseBy: browseByCreators.setBrowseBy,
    setProjectStatus: searchCreators.setProjectStatus,
    setProjectYear: searchCreators.setProjectYear,
    setFindAny: searchCreators.setFindAny,
    setSearchWords: searchCreators.setSearchWords,
  },
)(ViewTwo);

