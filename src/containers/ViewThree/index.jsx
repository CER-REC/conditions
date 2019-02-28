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
import './styles.scss';
import { allConditionsPerYear, allConditionsByCommodityOrInstrument } from '../../proptypes';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';
import * as selectedCreators from '../../actions/selected';
import * as chartIndicatorCreators from '../../actions/chartIndicatorPosition';

const noop = () => {};

const ViewThree = props => (
  <section className={classNames('ViewThree', { layoutOnly: props.layoutOnly })}>
    <section className="row">
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
    </section>
    <section className="row">
      <section className="featureDescription">
        <FeatureDescription feature={props.selected.feature} />
      </section>
      <section className="typesDescription">
        <FeatureTypesDescription feature={props.selected.feature} />
      </section>
    </section>
    <section className="row">
      <section className="selectedCompany">
        <SelectedGroupBar
          group="components.companyWheel.wheelRay.title"
          groupItem="groupItem"
          groupSize={16}
          groupItemSize={16}
          backgroundColor="lightgrey"
        >
          Company Name
        </SelectedGroupBar>
        <BrowseByButton mode="company" onClick={noop} />
      </section>
      <section className="conditionDetails">
        <span style={{ fontSize: '50px', marginLeft: '45%' }}>6</span>
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
  }).isRequired,
  setSelectedFeature: PropTypes.func.isRequired,
  setSelectedSubFeature: PropTypes.func.isRequired,
};

ViewThree.defaultProps = {
  layoutOnly: PropTypes.false,
};

export const ViewThreeRaw = ViewThree;

export default connect(
  ({ selected, chartIndicatorPosition }) => ({
    selected,
    chartIndicatorPosition,
    conditionCountsByYear,
    conditionCountsByCommodity,
  }),
  {
    setSelectedFeature: selectedCreators.setSelectedFeature,
    setSelectedSubFeature: selectedCreators.setSelectedSubFeature,
    setBubbleChartIndicator: chartIndicatorCreators.setBubbleChartIndicator,
  },
)(ViewThree);
