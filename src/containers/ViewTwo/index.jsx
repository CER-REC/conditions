import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import ProjectMenu from '../../components/ProjectMenu';
import FeaturesLegend from '../../components/FeaturesLegend';
import Wheel from '../../components/Wheel';
import GreyPipe from '../../components/GreyPipe';
import RegionConditionSummary from '../../components/RegionConditionSummary';
import RegionCompanies from '../../components/RegionCompanies';
import TrendButton from '../../components/TrendButton';
import { viewTwo } from '../../proptypes';
import SearchBar from '../../components/SearchBar';
import LocationWheelMinimap from '../../components/LocationWheelMinimap';
import FeaturesMenu from '../../components/FeaturesMenu';
import ConditionDetails from '../../components/ConditionDetails';
import { conditionCountsByYear, conditionCountsByCommodity, searchData } from '../../mockData';
import KeywordExplorerButton from '../../components/KeywordExplorerButton';
import './styles.scss';
import TotalConditionsLabel from '../../components/TotalConditionsLabel';

const noop = () => {};
const regionData = {
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
        <LocationWheelMinimap
          region={props.selected.region
            ? props.wheelData.find(region => region.id === props.selected.region).name
            : null
          }
        />
      ) : null}
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
            <RegionConditionSummary featureData={props.legendItems} />
            <RegionCompanies
              companies={regionData.companyData}
              activeConditionCompanies={regionData.activeConditionCompanies}
              openProjectDetails={regionData.openProjectDetails}
            />
          </div>
        )
        : (
          <React.Fragment>
            <TotalConditionsLabel />
            <ProjectMenu
              loading={props.projectMenuLoading}
              projectsData={props.projectsData}
              selectedProjectID={props.selected.project}
              onChange={props.setSelectedProject}
              selectedFeature={props.selected.feature}
            />
          </React.Fragment>
        )
      }
    </section>

    <section className="menus">
      <KeywordExplorerButton
        onClick={props.jumpToView1}
      />
      <TrendButton
        onClick={props.jumpToView3}
        feature={props.selected.feature}
        subFeature=""
        projectData={conditionCountsByYear.counts}
        instrumentData={conditionCountsByCommodity.counts}
      />
    </section>

    <section className="legend">
      <FeaturesMenu
        dropDown
        selected={props.selected.feature}
        onChange={props.setSelectedFeature}
      />
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

ViewTwo.propTypes = viewTwo;

ViewTwo.defaultProps = {
  layoutOnly: false,
  wheelData: [],
  legendItems: [],
  projectsData: [],
};

export default ViewTwo;
