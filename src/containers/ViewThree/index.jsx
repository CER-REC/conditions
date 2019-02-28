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
import SelectedGroupBar from '../../components/SelectedGroupBar';
import BrowseByButton from '../../components/BrowseByBtn';
import ConditionDetails from '../../components/ConditionDetails';
import './styles.scss';
import { allConditionsPerYear, allConditionsByCommodityOrInstrument } from '../../proptypes';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';
import * as selectedCreators from '../../actions/selected';

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
              indicator=""
              setIndicator={noop}
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
          // TODO: This is just a quick hack to get the component into the view
          {...props.conditionDetails}
          expanded={props.detailView}
          updateSelectedItem={props.updateSelectedItem}
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
  conditionCountsByCommodity: PropTypes.shape({
    counts: allConditionsByCommodityOrInstrument.isRequired,
  }).isRequired,
  selected: PropTypes.shape({
    feature: PropTypes.string.isRequired,
    subFeature: PropTypes.string,
  }).isRequired,
  setSelectedFeature: PropTypes.func.isRequired,
  setSelectedSubFeature: PropTypes.func.isRequired,

  conditionDetails: PropTypes.object.isRequired,
  detailView: PropTypes.bool.isRequired,
  updateSelectedItem: PropTypes.func.isRequired,
  openIntermediatePopup: PropTypes.func.isRequired,
  expandDetailView: PropTypes.func.isRequired,
  openProjectDetails: PropTypes.func.isRequired,
};

ViewThree.defaultProps = {
  layoutOnly: PropTypes.false,
};

export const ViewThreeRaw = ViewThree;

export default connect(
  ({ selected }) => ({
    selected,
    conditionCountsByYear,
    conditionCountsByCommodity,
  }),
  {
    setSelectedFeature: selectedCreators.setSelectedFeature,
    setSelectedSubFeature: selectedCreators.setSelectedSubFeature,
  },
)(ViewThree);
