import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { viewTwoQuery, projectMenuQuery } from '../../queries/viewTwo';
import ProjectMenu from '../../components/ProjectMenu';
import FeaturesLegend from '../../components/FeaturesLegend';
import Wheel from '../../components/Wheel';
import TrendButton from '../../components/TrendButton';
import { companyWheelData, locationData } from '../../components/Wheel/randomDataSample';
import { browseByType, yearRangeType, featureTypes, conditionData, project } from '../../proptypes';
import SearchBar from '../../components/SearchBar';
import LocationWheelMinimap from '../../components/LocationWheelMinimap';
import FeaturesMenu from '../../components/FeaturesMenu';
import ConditionDetails from '../../components/ConditionDetails';
import * as browseByCreators from '../../actions/browseBy';
import * as selectedCreators from '../../actions/selected';
import * as searchCreators from '../../actions/search';
import { conditionCountsByYear, conditionCountsByCommodity, searchData } from '../../mockData';
import './styles.scss';

const noop = () => {};
const legendItems = [
  { feature: 'theme', description: 'SECURITY', disabled: false },
  { feature: 'theme', description: 'FINANCIAL', disabled: false },
  { feature: 'theme', description: 'DAMAGE_PREVENTION', disabled: false },
  { feature: 'theme', description: 'SOCIO_ECONOMIC', disabled: false },
];

// SearchBar (Data)
const availableCategories = [
  'all',
  'oversight & safety',
  'environment',
  'administration & filings',
];
const availableYearRange = { start: 1970, end: 1980 };

const ViewTwo = props => (
  <section className={classNames('ViewTwo', { layoutOnly: props.layoutOnly })}>
    <section className="row">
      <section className="header">
        <SearchBar
          className={props.browseBy === 'location' ? 'small' : ''}
          suggestedKeywords={searchData}
          availableYearRange={availableYearRange}
          availableCategories={availableCategories}
          setIncluded={props.setIncluded}
          setExcluded={props.setExcluded}
          findAnyOnChange={props.setFindAny}
          updateYear={props.setProjectYear}
          changeProjectStatus={props.setProjectStatus}
          includeKeywords={props.included}
          excludeKeywords={props.excluded}
          projectStatus={props.projectStatus}
          yearRange={props.projectYear}
          findAny={props.findAny}
        />
        {props.browseBy === 'location' ? (
          <LocationWheelMinimap region="Lethbridge--Medicine Hat" />
        ) : null}
      </section>
    </section>
    <section className="row">
      <section className="wheel">
        <Wheel
          wheelType={props.browseBy}
          selectedRay={props.selected.company}
          selectRay={props.setSelectedCompany}
          wheelData={props.wheelData}
        />
      </section>
      <section className="companyBreakdown">
        <ProjectMenu
          projectsData={props.projectsData.counts}
          selectedProjectID={props.selected.project}
          onChange={props.setSelectedProject}
          selectedFeature={props.selected.feature}
        />
      </section>
      <section className="menus">
        <TrendButton
          onClick={props.jumpToView3}
          feature={props.selected.feature}
          subFeature=""
          projectData={conditionCountsByYear.counts}
          instrumentData={conditionCountsByCommodity.counts}
        />
        <FeaturesMenu
          dropDown
          selected={props.selected.feature}
          onChange={props.setSelectedFeature}
        />
        <FeaturesLegend legendItems={legendItems} selectedFeature="theme" isProjectLegend />
      </section>
      <section className="conditions">
        <ConditionDetails
          selectedItem={props.selected.condition}
          updateSelectedItem={props.setSelectedCondition}
          openIntermediatePopup={props.openIntermediatePopup}
          openProjectDetails={props.openProjectDetails}
          toggleExpanded={noop}
          searchKeywords={{
            include: props.included,
            exclude: props.excluded,
          }}
          {...props.conditionDetails}
        />
      </section>
    </section>
  </section>
);

ViewTwo.propTypes = {
  layoutOnly: PropTypes.bool,
  browseBy: browseByType.isRequired,
  selected: PropTypes.shape({
    company: PropTypes.number,
    region: PropTypes.number,
    project: PropTypes.number,
    feature: featureTypes.isRequired,
    condition: PropTypes.shape({
      instrumentIndex: PropTypes.number.isRequired,
      itemIndex: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  // setBrowseBy: PropTypes.func.isRequired,
  setFindAny: PropTypes.func.isRequired,
  setProjectYear: PropTypes.func.isRequired,
  projectStatus: PropTypes.arrayOf(PropTypes.string).isRequired,
  findAny: PropTypes.bool.isRequired,
  projectYear: yearRangeType.isRequired,
  setProjectStatus: PropTypes.func.isRequired,
  setIncluded: PropTypes.func.isRequired,
  setExcluded: PropTypes.func.isRequired,
  included: PropTypes.arrayOf(PropTypes.string).isRequired,
  excluded: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedFeature: PropTypes.func.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  setSelectedCompany: PropTypes.func.isRequired,
  setSelectedRegion: PropTypes.func.isRequired,
  conditionDetails: PropTypes.shape({
    isExpandable: PropTypes.bool,
    expanded: PropTypes.bool,
    selectedProject: PropTypes.string.isRequired,
    // searchKeywords: PropTypes.shape({
    //   include: PropTypes.arrayOf(PropTypes.string),
    //   exclude: PropTypes.arrayOf(PropTypes.string),
    // }),
    data: conditionData.isRequired,
  }).isRequired,
  setSelectedCondition: PropTypes.func.isRequired,
  openIntermediatePopup: PropTypes.func.isRequired,
  openProjectDetails: PropTypes.func.isRequired,
  projectsData: PropTypes.shape({
    counts: PropTypes.arrayOf(project).isRequired,
  }).isRequired,
  // The shape of wheelData will change once more integration is done.
  wheelData: PropTypes.arrayOf(PropTypes.any),
  jumpToView3: PropTypes.func.isRequired,
};

ViewTwo.defaultProps = {
  layoutOnly: false,
  wheelData: [],
};

export const ViewTwoUnconnected = props => (
  <ViewTwo
    // eslint-disable-next-line react/prop-types
    wheelData={props.browseBy === 'company' ? companyWheelData : locationData}
    {...props}
  />
);

export const ViewTwoGraphQL = props => (
  <Query query={viewTwoQuery}>
    {({ data }) => (
      // if (loading) // do something;
      // else if (error) // handle the error;
      // else {}
      // <Query query={projectMenuQuery} id={props.}
      <ViewTwo
        wheelData={
        // eslint-disable-next-line react/prop-types125
        props.browseBy === 'company' ? data.allCompanies : locationData
        }
        {...props}
      />
    )}
  </Query>
);

export default connect(
  ({ selected, browseBy, search }) => ({
    selected,
    browseBy,
    included: search.included,
    projectStatus: search.projectStatus,
    findAny: search.findAny,
    projectYear: search.projectYear,
    excluded: search.excluded,
  }),
  {
    setSelectedFeature: selectedCreators.setSelectedFeature,
    setSelectedCompany: selectedCreators.setSelectedCompany,
    setSelectedRegion: selectedCreators.setSelectedRegion,
    setSelectedCondition: selectedCreators.setSelectedCondition,
    setSelectedProject: selectedCreators.setSelectedProject,
    setBrowseBy: browseByCreators.setBrowseBy,
    setProjectStatus: searchCreators.setProjectStatus,
    setProjectYear: searchCreators.setProjectYear,
    setFindAny: searchCreators.setFindAny,
    setIncluded: searchCreators.setIncluded,
    setExcluded: searchCreators.setExcluded,
  },
)(ViewTwoGraphQL);
