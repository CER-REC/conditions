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

import { conditionCountsByYear, conditionCountsByCommodity, searchData } from '../../mockData';
import KeywordExplorerButton from '../../components/KeywordExplorerButton';
import './styles.scss';
import TotalConditionsLabel from '../../components/TotalConditionsLabel';

const availableCategories = [
  'all',
  'oversight & safety',
  'environment',
  'administration & filings',
];
const availableYearRange = { start: 1970, end: 1980 };

class ViewTwo extends React.Component {
  regionName = null;

  constructor() {
    super();
    this.state = {
      wheelMoving: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected.region !== this.props.selected.region) {
      this.regionName = this.props.selected.region
        ? this.props.wheelData.find(region => region.id === this.props.selected.region).name
        : null;
    }
  }

  setWheelMoving = (moving) => { this.setState({ wheelMoving: moving }); };

  render() {
    return (
      <section className={classNames('ViewTwo', { layoutOnly: this.props.layoutOnly })}>
        <section className="header">
          <SearchBar
            className={this.props.browseBy === 'location' ? 'small' : ''}
            suggestedKeywords={searchData}
            availableYearRange={availableYearRange}
            availableCategories={availableCategories}
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
              region={this.regionName}
              className={this.state.wheelMoving ? 'hidden' : ''}
            />
          ) : null}
        </section>

        <section className="wheel">
          <Wheel
            wheelType={this.props.browseBy}
            selectedRay={this.props.browseBy === 'company' ? this.props.selected.company : this.props.selected.region}
            selectRay={this.props.browseBy === 'company' ? this.props.setSelectedCompany : this.props.setSelectedRegion}
            wheelData={this.props.wheelData}
            wheelMotionTrigger={this.setWheelMoving}
          />
          <GreyPipe mode={this.props.browseBy} />
        </section>
        <section className="companyBreakdown">
          {this.props.browseBy === 'location'
            ? (
              <div className="regionChart">
                <RegionConditionSummary
                  featureData={this.props.legendItems}
                  isHidden={this.state.wheelMoving}
                />
                <RegionCompanies
                  companies={this.props.regionCompanyData.companies}
                  activeConditionCompanies={this.props.regionCompanyData.selectedConditionCompanies}
                  openProjectDetails={this.props.openProjectDetails}
                  isVisible={this.state.wheelMoving ? 'hidden' : ''}
                />
              </div>
            )
            : (
              <React.Fragment>
                <TotalConditionsLabel />
                <ProjectMenu
                  loading={this.state.wheelMoving || this.props.projectMenuLoading}
                  projectsData={this.props.projectsData}
                  selectedProjectID={this.props.selected.project}
                  onChange={this.props.setSelectedProject}
                  selectedFeature={this.props.selected.feature}
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
            projectData={conditionCountsByYear.counts}
            instrumentData={conditionCountsByCommodity.counts}
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
};

export default ViewTwo;
