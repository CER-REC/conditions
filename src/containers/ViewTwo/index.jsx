import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { companyWheelQuery } from '../../queries/viewTwoQueries/wheel';
import { projectMenuQuery } from '../../queries/viewTwoQueries/projectMenu';
import ProjectMenu from '../../components/ProjectMenu';
import FeaturesLegend from '../../components/FeaturesLegend';
import Wheel from '../../components/Wheel';
import GreyPipe from '../../components/GreyPipe';
import RegionConditionSummary from '../../components/RegionConditionSummary';
import RegionCompanies from '../../components/RegionCompanies';
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

const regionData = {
  featureData: [
    { feature: 'theme', description: 'STANDARD_CONDITION', count: 50 },
    { feature: 'theme', description: 'INTEGRITY_MANAGEMENT', count: 20 },
    { feature: 'theme', description: 'ENVIRONMENTAL_PROTECTION', count: 43 },
  ],
  companyData: [
    { id: '12', name: 'Alberta Trans-Alta e' },
    { id: '11', name: 'Alberta Trans-Alta è' },
    { id: '1', name: 'Canada-Montana Pipe Line Company' },
  ],
  activeConditionCompanies: ['3'],
  openProjectDetails: noop,
};

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

      {/* TODO: Placeholder for functionality; waiting on a design for this */}
      <button
        className="view1reset"
        type="button"
        onClick={props.jumpToView1}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '48px',
        }}
      >
          Back To Introduction
      </button>
    </section>

    <section className="wheel">
      <Wheel
        wheelType={props.browseBy}
        selectedRay={props.browseBy === 'company' ? props.selected.company : props.selected.region}
        selectRay={props.browseBy === 'company' ? props.setSelectedCompany : props.setSelectedRegion}
        wheelData={props.wheelData}
      />
      <GreyPipe mode={props.browseBy} />
    </section>
    <section className="companyBreakdown">
      {props.browseBy === 'location'
        ? (
          <div className="regionChart">
            <RegionConditionSummary featureData={regionData.featureData} />
            <RegionCompanies
              companies={regionData.companyData}
              activeConditionCompanies={regionData.activeConditionCompanies}
              openProjectDetails={regionData.openProjectDetails}
            />
          </div>
        )
        : (
          <ProjectMenu
            loading={props.projectMenuLoading}
            projectsData={props.projectsData}
            selectedProjectID={props.selected.project}
            onChange={props.setSelectedProject}
            selectedFeature={props.selected.feature}
          />
        )
      }
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
    </section>

    <section className="legend">
      <FeaturesLegend
        legendItems={props.legendItems}
        selectedFeature={props.selected.feature}
        isProjectLegend={props.browseBy !== 'location'}
      />
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
        browseBy={props.browseBy}
        {...props.conditionDetails}
      />
    </section>
  </section>
);

ViewTwo.propTypes = {
  layoutOnly: PropTypes.bool,
  browseBy: browseByType.isRequired,
  legendItems: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    description: PropTypes.string.isRequired,
  })).isRequired,
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
  jumpToView1: PropTypes.func.isRequired,
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

export const ViewTwoGraphQL = (props) => {
  if (props.browseBy === 'company') {
    return (
    // The queries must be by company and location and then subdivide.
    // The common queries such as the condition explorer must be set at the view level
      <Query query={companyWheelQuery}>
        {({ data: wheelData }) => (
          <Query
            query={projectMenuQuery}
            variables={{ id: props.selected.company }}
            skip={!props.selected.company}
          >
            { (projectMenuQprops) => {
              const { loading: projLoading } = projectMenuQprops;
              const { error: projError } = projectMenuQprops;
              const { data: projData } = projectMenuQprops;
              const legendItem = props.selected.company && !projLoading && !projError
                ? projData.allProjectsByCompany.find(item => item.id === props.selected.project)
                : null;
              const rawFeatureData = legendItem
                ? legendItem.aggregatedCount[props.selected.feature]
                : [];
              const projectFeatureData = Object.keys(rawFeatureData)
                .filter(key => key !== '__typename')
                .map(key => ({
                  feature: props.selected.feature,
                  description: key,
                  disabled: !rawFeatureData[key] > 0,
                }));
              // MISSING ERROR HANDLING
              return (
                <ViewTwo
                  wheelData={
                    wheelData.allCompanies
                  }
                  projectsData={!projLoading && !projError && props.selected.company
                    ? projData.allProjectsByCompany
                    : []
                  }
                  projectMenuLoading={projLoading}
                  legendItems={projectFeatureData}
                  {...props}
                />
              );
            }}
          </Query>
        )
        }
      </Query>
    );
  }
  return (<ViewTwo {...props} wheelData={locationData} legendItems={regionData.featureData} />);
};
ViewTwoGraphQL.propTypes = ViewTwo.propTypes;

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
