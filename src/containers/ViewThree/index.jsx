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
import { allConditionsPerYear } from '../../proptypes';
import { conditionCountsByYear } from '../../mockData';
import * as selectedCreators from '../../actions/selected';

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
              data={[]}
              onChange={noop}
            />
          )
          : (
            <SmallMultiplesLegend
              feature={props.selected.feature}
              data={props.conditionCountsByYear.counts}
              onChange={props.setSelectedSubFeature}
            />
          )}
      </section>
      <section className="chart">
        {props.selected.feature === 'instrument'
          ? (
            <BubbleChart
              selectedCategory=""
              instrumentChartData1={{}}
              instrumentChartData2={{}}
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
  ({ selected }) => ({
    selected,
    conditionCountsByYear,
  }),
  {
    setSelectedFeature: selectedCreators.setSelectedFeature,
    setSelectedSubFeature: selectedCreators.setSelectedSubFeature,
  },
)(ViewThree);
