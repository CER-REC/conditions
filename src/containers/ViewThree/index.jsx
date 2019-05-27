import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { yearRange } from '../../queries/viewThreeQueries/yearRange';
import FeaturesMenu from '../../components/FeaturesMenu';
import SmallMultiplesLegend from '../../components/SmallMultiplesLegend';
import InstrumentsLegend from '../../components/InstrumentsLegend';
import StreamGraph from '../../components/StreamGraph';
import BubbleChart from '../../components/BubbleChart';
import FeatureDescription from '../../components/FeatureDescription';
import FeatureTypesDescription from '../../components/FeatureTypesDescription';
import './styles.scss';
import { allConditionsPerYear, allConditionsByCommodityOrInstrument } from '../../proptypes';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';
import * as selectedCreators from '../../actions/selected';
import * as chartIndicatorCreators from '../../actions/chartIndicatorPosition';
import * as detailViewExpandedCreators from '../../actions/detailViewExpanded';

class ViewThree extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.loading === false;
  }

  render() {
    const { props } = this;

    return (
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
            <FormattedMessage id="views.view3.company" />
            <h2 className="companyName">Company Name</h2>
          </div>
        </section>
      </section>
    );
  }
}

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
};

ViewThree.defaultProps = {
  layoutOnly: PropTypes.false,
  loading: false,
};

export const ViewThreeUnconnected = ViewThree;

export const ViewThreeGraphQL = props => (
  <Query query={yearRange}>
    {({ data, loading }) => {
      // TODO: Figure what to render while we're waiting
      if (loading || !data) { return null; }

      // Placeholder to demonstrate that the query is working
      // eslint-disable-next-line no-console
      console.dir(data.allConfigurationData);

      return (
        <ViewThree
          // data props here
          data={data}
          loading={loading}
          minYear={data.allConfigurationData.instrumentYearRange.min}
          maxYear={data.allConfigurationData.instrumentYearRange.max}
          {...props}
        />
      );
    }}
  </Query>
);

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
    setBubbleChartIndicator: chartIndicatorCreators.setBubbleChartIndicator,
    expandDetailView: detailViewExpandedCreators.toggleDetailView,
  },
)(ViewThreeGraphQL);
