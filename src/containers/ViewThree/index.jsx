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
import BrowseByButton from '../../components/BrowseByBtn';
import ConditionDetails from '../../components/ConditionDetails';
import './styles.scss';
import { allConditionsPerYear, allConditionsByCommodityOrInstrument } from '../../proptypes';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';
import * as selectedCreators from '../../actions/selected';
import * as chartIndicatorCreators from '../../actions/chartIndicatorPosition';
import * as detailViewExpandedCreators from '../../actions/detailViewExpanded';

const noop = () => {};

const ViewThree = props => (
  <section className={classNames('ViewThree', { layoutOnly: props.layoutOnly })}>
    <section className="row firstRow">
      <section className="features">
        <FeaturesMenu
          selected={props.selected.feature}
          onChange={props.setSelectedFeature}
        />
      </section>
      {/* Putting this here to avoid breaking our CSS grid's
        * first-child or last-child behaviors */}
      <div className="borderContainer" />
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
    </section>
    <section className="row secondRow">
      <section className="featureDescription">
        <FeatureDescription feature={props.selected.feature} />
      </section>
      {/* Putting this here to avoid breaking our CSS grid's
        * first-child or last-child behaviors */}
      <div className="borderContainer" />
      <section className="typesDescription">
        <FeatureTypesDescription feature={props.selected.feature} />
      </section>
    </section>
    <section className="row thirdRow">
      <section className="selectedCompany">
        {/* TODO: Use SelectedGroupBar instead of hardcoding here */}
        <div className="selectedCompanyHeader">
          <h1>Selected Company:</h1> <h2>Company Name</h2>
        </div>
        <BrowseByButton mode="company" onClick={noop} />
      </section>
      <section className="conditionDetails">
        <ConditionDetails
          isExpandable
          {...props.conditionDetails}
          selectedItem={props.selected.condition}
          expanded={props.detailViewExpanded}
          updateSelectedItem={props.setSelectedCondition}
          openIntermediatePopup={props.openIntermediatePopup}
          toggleExpanded={props.expandDetailView}
          openProjectDetails={props.openProjectDetails}
        />
      </section>
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

  conditionDetails: PropTypes.shape({
    isExpandable: PropTypes.bool,
    expanded: PropTypes.bool,
    selectedProject: PropTypes.string.isRequired,
    searchKeywords: PropTypes.shape({
      include: PropTypes.arrayOf(PropTypes.string),
      exclude: PropTypes.arrayOf(PropTypes.string),
    }),
    data: PropTypes.arrayOf(PropTypes.shape({
      instrumentNumber: PropTypes.string.isRequired,
      issuanceDate: PropTypes.string.isRequired,
      effectiveDate: PropTypes.string.isRequired,
      sunsetDate: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      activity: PropTypes.string.isRequired,
      conditions: PropTypes.arrayOf(PropTypes.shape({
        binnedValue: PropTypes.number.isRequired,
        fill: PropTypes.arrayOf(PropTypes.string).isRequired,
        keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
        text: PropTypes.string.isRequired,
        details: PropTypes.shape({
          theme: PropTypes.string.isRequired,
          instrument: PropTypes.string.isRequired,
          phase: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          status: PropTypes.string.isRequired,
          filing: PropTypes.string.isRequired,
        }).isRequired,
      })).isRequired,
    })).isRequired,
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
    chartIndicatorPosition,
    detailViewExpanded,
  }) => ({
    selected,
    browseBy,
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
