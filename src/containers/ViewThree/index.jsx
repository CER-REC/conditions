import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import FeaturesMenu from '../../components/FeaturesMenu';
import SmallMultiplesLegend from '../../components/SmallMultiplesLegend';
import InstrumentsLegend from '../../components/InstrumentsLegend';
import StreamGraph from '../../components/StreamGraph';
import BubbleChart from '../../components/BubbleChart';
import FeatureDescription from '../../components/FeatureDescription';
import FeatureTypesDescription from '../../components/FeatureTypesDescription';
import ConditionDetails from '../../components/ConditionDetails';
import './styles.scss';
import { allConditionsPerYear, allConditionsByCommodityOrInstrument, conditionData } from '../../proptypes';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';
import * as selectedCreators from '../../actions/selected';
import * as chartIndicatorCreators from '../../actions/chartIndicatorPosition';
import * as detailViewExpandedCreators from '../../actions/detailViewExpanded';

const ViewThree = props => (
  <section className={classNames('ViewThree', { layoutOnly: props.layoutOnly })}>
    <section className="gradientContainer" />
    <section className="features">
      <FeaturesMenu
        selected={props.selected.feature}
        onChange={props.setSelectedFeature}
      />
    </section>
    <section className="legend">
      {props.selected.feature === 'instrument'
        ? (
          <InstrumentsLegend
            data={props.conditionCountsByCommodity.counts}
            onChange={props.setSelectedSubFeature}
            selected={props.selected.subFeature}
          />
        )
        : (
          <SmallMultiplesLegend
            feature={props.selected.feature}
            data={props.conditionCountsByYear.counts}
            onChange={props.setSelectedSubFeature}
            selected={props.selected.subFeature}
          />
        )}
    </section>
    <section className="chart">
      {props.selected.feature === 'instrument'
        ? (
          <BubbleChart
            data={conditionCountsByCommodity.counts}
            type={props.selected.subFeature}
            indicator={props.chartIndicatorPosition.bubble}
            setIndicator={props.setBubbleChartIndicator}
          />
        )
        : (
          <StreamGraph
            projectData={props.conditionCountsByYear.counts}
            feature={props.selected.feature}
            subFeature={props.selected.subFeature}
          />
        )}
    </section>
    <section className="featureDescription">
      <FeatureDescription feature={props.selected.feature} />
    </section>
    <section className="typesDescription">
      <FeatureTypesDescription
        feature={props.selected.feature}
        subFeature={props.selected.subFeature}
      />
    </section>
    <section className="selectedCompany">
      {/* TODO: Use SelectedGroupBar instead of hardcoding here */}
      <div className="selectedCompanyHeader">
        <h1>Selected Company:</h1> <h2>Company Name</h2>
      </div>
    </section>
    <section className="conditions">
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
);

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
