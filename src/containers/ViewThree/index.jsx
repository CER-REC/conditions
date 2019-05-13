import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import FeaturesMenu from '../../components/FeaturesMenu';
import SmallMultiplesLegend from '../../components/SmallMultiplesLegend';
import StreamGraph from '../../components/StreamGraph';
import FeatureDescription from '../../components/FeatureDescription';
import FeatureTypesDescription from '../../components/FeatureTypesDescription';
import ConditionDetails from '../../components/ConditionDetails';
import './styles.scss';
import { allConditionsPerYear, allConditionsByCommodityOrInstrument, conditionData } from '../../proptypes';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';
import * as selectedCreators from '../../actions/selected';
import * as chartIndicatorCreators from '../../actions/chartIndicatorPosition';
import * as detailViewExpandedCreators from '../../actions/detailViewExpanded';

const processConditionCounts = (counts) => {
  const instruments = counts
    .filter(entry => entry.feature === 'instrument')
    .map(entry => ({
      feature: 'instrument',
      subFeature: entry.subFeature,
      years: entry.years,
      total: Object.values(entry.years).reduce((acc, cur) => acc + cur, 0),
    }))
    .sort((a, b) => (b.total - a.total));

  const minorYears = instruments.slice(9).reduce((aggregatedYears, entry) => {
    return Object.entries(entry.years).reduce((acc, [year, count]) => {
      acc[year] = (acc[year] || 0) + count;

      return acc;
    }, aggregatedYears);
  }, {});

  const instrumentsOut = instruments.slice(0, 9);
  instrumentsOut.push({
    feature: 'instrument',
    subFeature: 'OTHER',
    years: minorYears,
  });

  const notInstruments = counts.filter(entry => entry.feature !== 'instrument');
  return [...instrumentsOut, ...notInstruments];
};

const ViewThree = (props) => {
  const conditionCounts = processConditionCounts(props.conditionCountsByYear.counts);

  return (
    <section className={classNames('ViewThree', { layoutOnly: props.layoutOnly })}>
      <section className="row firstRow">
        <section className="features">
          <FeaturesMenu
            selected={props.selected.feature}
            onChange={props.setSelectedFeature}
          />
        </section>
        <section className="legend">
          <SmallMultiplesLegend
            feature={props.selected.feature}
            data={conditionCounts}
            onChange={props.setSelectedSubFeature}
            selected={props.selected.subFeature}
          />
        </section>
        <section className="chart">
          <StreamGraph
            projectData={conditionCounts}
            feature={props.selected.feature}
            subFeature={props.selected.subFeature}
          />
        </section>
      </section>
      <section className="row secondRow">
        <section className="featureDescription">
          <FeatureDescription feature={props.selected.feature} />
        </section>
        <section className="typesDescription">
          <FeatureTypesDescription
            feature={props.selected.feature}
            subFeature={props.selected.subFeature}
          />
        </section>
      </section>
      <section className="row thirdRow">
        <section className="selectedCompany">
          {/* TODO: Use SelectedGroupBar instead of hardcoding here */}
          <div className="selectedCompanyHeader">
            <h1>Selected Company:</h1> <h2>Company Name</h2>
          </div>
        </section>
        <section className="conditionDetails">
          <ConditionDetails
            isExpandable
            selected
            selectedItem={props.selected.condition}
            expanded={props.detailViewExpanded}
            updateSelectedItem={props.setSelectedCondition}
            openIntermediatePopup={props.openIntermediatePopup}
            toggleExpanded={props.expandDetailView}
            openProjectDetails={props.openProjectDetails}
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
};

ViewThree.propTypes = {
  layoutOnly: PropTypes.bool,
  conditionCountsByYear: PropTypes.shape({
    counts: allConditionsPerYear.isRequired,
  }).isRequired,
  chartIndicatorPosition: PropTypes.shape({
    bubble: PropTypes.string.isRequired,
    stream: PropTypes.number.isRequired,
  }).isRequired,
  setBubbleChartIndicator: PropTypes.func.isRequired,
  conditionCountsByCommodity: PropTypes.shape({
    counts: allConditionsByCommodityOrInstrument.isRequired,
  }).isRequired,
  selected: PropTypes.shape({
    feature: PropTypes.string.isRequired,
    subFeature: PropTypes.string,
    condition: PropTypes.shape({
      instrumentIndex: PropTypes.number.isRequired,
      itemIndex: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  setSelectedFeature: PropTypes.func.isRequired,
  setSelectedSubFeature: PropTypes.func.isRequired,
  included: PropTypes.arrayOf(PropTypes.string).isRequired,
  excluded: PropTypes.arrayOf(PropTypes.string).isRequired,
  conditionDetails: PropTypes.shape({
    isExpandable: PropTypes.bool,
    expanded: PropTypes.bool,
    selectedProject: PropTypes.string.isRequired,
    data: conditionData.isRequired,
  }).isRequired,
  detailViewExpanded: PropTypes.bool.isRequired,
  setSelectedCondition: PropTypes.func.isRequired,
  openIntermediatePopup: PropTypes.func.isRequired,
  expandDetailView: PropTypes.func.isRequired,
  openProjectDetails: PropTypes.func.isRequired,
};

ViewThree.defaultProps = {
  layoutOnly: PropTypes.false,
};

export const ViewThreeRaw = ViewThree;

export default connect(
  ({
    selected,
    browseBy,
    search,
    chartIndicatorPosition,
    detailViewExpanded,
  }) => ({
    selected,
    browseBy,
    included: search.included,
    excluded: search.excluded,
    chartIndicatorPosition,
    detailViewExpanded,

    // TODO: Remove these since they're data and not state
    conditionCountsByYear,
    conditionCountsByCommodity,
  }),
  {
    setSelectedFeature: selectedCreators.setSelectedFeature,
    setSelectedSubFeature: selectedCreators.setSelectedSubFeature,
    setSelectedCondition: selectedCreators.setSelectedCondition,
    setBubbleChartIndicator: chartIndicatorCreators.setBubbleChartIndicator,
    expandDetailView: detailViewExpandedCreators.toggleDetailView,
  },
)(ViewThree);
