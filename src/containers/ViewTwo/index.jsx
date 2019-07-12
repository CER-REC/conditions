import React from 'react';
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

import { searchData } from '../../mockData';
import KeywordExplorerButton from '../../components/KeywordExplorerButton';
import './styles.scss';
import TotalConditionsLabel from '../../components/TotalConditionsLabel';
import DotLegend from '../../components/DotLegend';

class ViewTwo extends React.Component {
  miniMapData = null;

  constructor(props) {
    super(props);
    if (props.selected.region) {
      this.miniMapData = props.wheelData
        .find(region => region.id === props.selected.region);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected.region !== this.props.selected.region
      || prevProps.wheelData !== this.props.wheelData) {
      this.miniMapData = this.props.selected.region
        ? this.props.wheelData.find(region => region.id === this.props.selected.region)
        : null;
    }
  }

  render() {
    // TODO: Evil hack. Ideally we would refactor the App's Redux connection to
    // be outside the initial queries so we could update the store when they return.
    if (!this.props.projectYear.start) {
      this.props.setProjectYear(this.props.projectYears);
    }

    const countData = this.props.projectsData.reduce((acc, project) => {
      acc.instrumentCount += project.numberOfInstruments;
      acc.conditionCount += project.numberOfConditions;

      return acc;
    }, { projectCount: this.props.projectsData.length, instrumentCount: 0, conditionCount: 0 });

    return (
      <section className={classNames('ViewTwo', { layoutOnly: this.props.layoutOnly })}>
        <section className="header">
          <SearchBar
            className={this.props.browseBy === 'location' ? 'small' : ''}
            suggestedKeywords={searchData}
            availableYearRange={this.props.projectYears}
            availableCategories={this.props.availableCategories}
            setIncluded={this.props.setIncluded}
            setExcluded={this.props.setExcluded}
            findAnyOnChange={this.props.setFindAny}
            updateYear={this.props.setProjectYear}
            changeProjectStatus={this.props.setProjectStatus}
            includeKeywords={this.props.included}
            excludeKeywords={this.props.excluded}
            projectStatus={this.props.projectStatus}
            yearRange={this.props.projectYear}
            findAny={this.props.findAny}
          />
          {this.props.browseBy === 'location' ? (
            <LocationWheelMinimap
              region={this.miniMapData}
              className={this.props.wheelMoving ? 'hidden' : ''}
            />
          ) : null}
        </section>

        <section className="wheel">
          <Wheel
            wheelType={this.props.browseBy}
            selectedRay={this.props.browseBy === 'company' ? this.props.selected.company : this.props.selected.region}
            selectRay={this.props.browseBy === 'company' ? this.props.setSelectedCompany : this.props.setSelectedRegion}
            wheelData={this.props.wheelData}
            wheelMotionTrigger={this.props.setWheelMoving}
            relevantProjectLookup={this.props.searchResults.projectIdLookup}
            filteredProjectLookup={this.props.filteredProjectLookup}
          />
          <GreyPipe
            mode={this.props.browseBy}
            {...((
              this.props.browseBy === 'company'
              && !(this.props.wheelMoving || this.props.projectMenuLoading)
            )
              ? countData
              : {}
            )}
          />
          {(this.props.browseBy === 'company')
            ? <DotLegend />
            : null
          }
        </section>
        <section className="companyBreakdown">
          {this.props.browseBy === 'location'
            ? (
              <div className="regionChart">
                <RegionConditionSummary
                  featureData={this.props.legendItems}
                  isHidden={this.props.wheelMoving}
                />
                <RegionCompanies
                  companies={this.props.regionCompanyData.companies}
                  activeConditionCompanies={this.props.regionCompanyData.selectedConditionCompanies}
                  openProjectDetails={this.props.openProjectDetails}
                  isVisible={this.props.wheelMoving ? 'hidden' : ''}
                />
              </div>
            )
            : (
              <React.Fragment>
                <TotalConditionsLabel />
                <ProjectMenu
                  loading={this.props.wheelMoving || this.props.projectMenuLoading}
                  projectsData={this.props.projectsData}
                  selectedProjectID={this.props.selected.project}
                  onChange={this.props.setSelectedProject}
                  selectedFeature={this.props.selected.feature}
                  relevantProjectLookup={this.props.searchResults.projectIdLookup}
                  filteredProjectLookup={this.props.filteredProjectLookup}
                />
              </React.Fragment>
            )
          }
        </section>

        <section className="menus">
          <KeywordExplorerButton
            onClick={this.props.jumpToView1}
          />
          <TrendButton
            onClick={this.props.jumpToView3}
            feature={this.props.selected.feature}
            subFeature=""
            years={this.props.years}
            countsData={this.props.conditionsPerYear}
          />
        </section>

        <section className="legend">
          <FeaturesMenu
            dropDown
            selected={this.props.selected.feature}
            onChange={this.props.setSelectedFeature}
          />
          <FeaturesLegend
            legendItems={this.props.legendItems}
            selectedFeature={this.props.selected.feature}
            isProjectLegend={this.props.browseBy !== 'location'}
          />
        </section>
      </section>
    );
  }
}

ViewTwo.propTypes = viewTwo;

ViewTwo.defaultProps = {
  layoutOnly: false,
  wheelData: [],
  legendItems: [],
  projectsData: [],
  searchResults: {
    companyIdLookup: [],
    conditionIdLookup: [],
    projectIdLookup: [],
  },
  filteredProjectLookup: [],
};

export default ViewTwo;
