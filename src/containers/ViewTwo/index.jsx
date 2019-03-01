import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ProjectMenu from '../../components/ProjectMenu';
import FeaturesLegend from '../../components/FeaturesLegend';
import Wheel from '../../components/Wheel';
import BrowseByBtn from '../../components/BrowseByBtn';
import { companyWheelData } from '../../components/Wheel/randomDataSample';
import TrendButton from '../../components/TrendButton';
import { browseByType, featureTypes } from '../../proptypes';
import SearchBar from '../../components/SearchBar';
import FeaturesMenu from '../../components/FeaturesMenu';
import ConditionDetails from '../../components/ConditionDetails';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';
import * as browseByCreators from '../../actions/browseBy';
import * as selectedCreators from '../../actions/selected';
import './styles.scss';
import data from '../../components/ConditionDetails/testData';

const noop = () => {};

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

// SearchBar
const availableYearRange = { start: 1970, end: 1980 };
const sampleSuggestedKeywords = {
  safety: { conditions: 1200, category: ['administration & filings'] },
  emissions: { conditions: 1000, category: ['environment'] },
  habitat: { conditions: 800, category: ['environment', 'oversight & safety'] },
  construction: { conditions: 1000, category: ['environment'] },
};

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
          suggestedKeywords={sampleSuggestedKeywords}
          availableYearRange={availableYearRange}
          availableCategories={availableCategories}
          updateKeywords={noop}
          findAnyOnChange={noop}
          updateYear={noop}
          changeProjectStatus={noop}
          includeKeywords={['safety']}
          excludeKeywords={[]}
          projectStatus={['OPEN', 'CANCELLED']}
          yearRange={availableYearRange}
          findAny
        />
      </section>
    </section>
    <section className="row">
      <section className="wheel">
        <Wheel
          wheelType={props.browseBy}
          selectRay={noop}
          itemsData={props.browseBy === 'company' ? companyWheelData : {
            legendData: companyWheelData.legendData.slice(0, 25),
            items: companyWheelData.items.slice(0, 25),
          }}
        />
        <BrowseByBtn mode="company" onClick={props.setBrowseBy} />
        <BrowseByBtn mode="location" onClick={props.setBrowseBy} />
      </section>
      <section className="companyBreakdown">
        <ProjectMenu
          projectData={projectData}
          selectedProjectID={1225}
          onChange={noop}
          selectedFeature="theme"
        />
      </section>
      <section className="menus">
        <TrendButton
          onClick={noop}
          feature="theme"
          subFeature=""
          projectData={conditionCountsByYear.counts}
          instrumentData={conditionCountsByCommodity.counts}
        />
        <FeaturesMenu
          dropDown
          selected={props.selected.feature}
          onChange={props.setSelectedFeature}
        />
        <FeaturesLegend
          legendItems={legendItems}
          selectedFeature="theme"
          isProjectLegend
        />
      </section>
      <section className="conditions">
        <ConditionDetails
          {...defaultProps}
          toggleExpanded={noop}
          updateSelectedItem={noop}
        />
      </section>
    </section>
  </section>
);

ViewTwo.propTypes = {
  layoutOnly: PropTypes.bool,
  browseBy: browseByType.isRequired,
  selected: PropTypes.shape({
    feature: featureTypes.isRequired,
  }).isRequired,
  setBrowseBy: PropTypes.func.isRequired,
  setSelectedFeature: PropTypes.func.isRequired,
};

ViewTwo.defaultProps = {
  layoutOnly: false,
};

export const ViewTwoUnconnected = ViewTwo;

export default connect(
  ({ selected, browseBy }) => ({
    selected,
    browseBy,
  }),
  {
    setSelectedFeature: selectedCreators.setSelectedFeature,
    setSelectedCompany: selectedCreators.setSelectedCompany,
    setBrowseBy: browseByCreators.setBrowseBy,
  },
)(ViewTwo);

