import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { conditionsPerYear } from '../../queries/viewThreeQueries/conditionsPerYear';
import FeaturesMenu from '../../components/FeaturesMenu';
import SmallMultiplesLegend from '../../components/SmallMultiplesLegend';
import StreamGraph from '../../components/StreamGraph';
import FeatureDescription from '../../components/FeatureDescription';
import FeatureTypesDescription from '../../components/FeatureTypesDescription';
import ConditionDetails from '../../components/ConditionDetails';
import './styles.scss';
import { allConditionsPerYear, conditionData } from '../../proptypes';
import { conditionCountsByYear, displayOrder } from '../../mockData';
import * as selectedCreators from '../../actions/selected';
import * as chartIndicatorCreators from '../../actions/chartIndicatorPosition';
import * as detailViewExpandedCreators from '../../actions/detailViewExpanded';

const processConditionCounts = (counts) => {
  // TODO: Change to 'const' once the instrument hack below is removed
  // eslint-disable-next-line prefer-const
  let [instruments, notInstruments] = Object.entries(counts)
    .reduce((acc, [feature, featureCounts]) => {
      if (feature === 'year' || feature === '__typename') return acc;
      const pushTo = (feature === 'instrument') ? 0 : 1;

      Object.entries(featureCounts).forEach(([subFeature, subCounts]) => {
        if (subFeature === '__typename') return;
        const countObj = {
          feature,
          subFeature,
          years: {},
          total: 0,
        };

        subCounts.forEach((count, idx) => {
          countObj.years[counts.year[idx]] = count;
          countObj.total += count;
        });

        acc[pushTo].push(countObj);
      });

      return acc;
    }, [[], []]);

  // TODO: Hack to keep things from breaking until we have live instrument data
  instruments = conditionCountsByYear.counts.filter(entry => entry.feature === 'instrument');

  instruments.sort((a, b) => (b.total - a.total));

  const minorInstrumentYears = instruments.slice(9)
    .reduce((aggregatedYears, entry) => Object.entries(entry.years)
      .reduce((acc, [year, count]) => {
        acc[year] = (acc[year] || 0) + count;

        return acc;
      }, aggregatedYears),
    {});

  const instrumentsOut = instruments.slice(0, 9);
  instrumentsOut.push({
    feature: 'instrument',
    subFeature: 'OTHER',
    years: minorInstrumentYears,
  });

  const prefixOrder = instruments.reduce((acc, cur) => {
    acc.push(cur.subFeature);
    return acc;
  }, []);

  // We need to know their order here for the StreamGraph's colors
  instrumentsOut.forEach((_, idx) => { instrumentsOut[idx].rank = idx; });

  return { conditionCounts: [...instrumentsOut, ...notInstruments], prefixOrder };
};

class ViewThree extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.loading === false;
  }

  render() {
    const { props } = this;
    const { conditionCounts, prefixOrder } = processConditionCounts(
      props.data.conditionsPerYear,
    );

    const reversedCounts = conditionCounts.slice().reverse();

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
          <SmallMultiplesLegend
            feature={props.selected.feature}
            data={conditionCounts}
            onChange={props.setSelectedSubFeature}
            selected={props.selected.subFeature}
          />
        </section>
        <section className="chart">
          <StreamGraph
            countsData={reversedCounts}
            feature={props.selected.feature}
            subFeature={props.selected.subFeature}
          />
        </section>
        <section className="featureDescription">
          <FeatureDescription feature={props.selected.feature} />
        </section>
        <section className="typesDescription">
          <FeatureTypesDescription
            feature={props.selected.feature}
            subFeature={props.selected.subFeature}
            displayOrder={
              (props.selected.feature === 'instrument')
                ? prefixOrder
                : displayOrder.features[props.selected.feature]
            }
          />
        </section>
        <section className="selectedCompany">
          {/* TODO: Use SelectedGroupBar instead of hardcoding here */}
          <div className="selectedCompanyHeader">
            <FormattedMessage id="views.view3.company" />
            <h2 className="companyName">Company Name</h2>
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
  loading: PropTypes.bool,
};

ViewThree.defaultProps = {
  layoutOnly: PropTypes.false,
  loading: false,
};

export const ViewThreeUnconnected = ViewThree;

export const ViewThreeGraphQL = props => (
  <Query query={conditionsPerYear}>
    {({ data: conditionsData, loading: conditionsLoading }) => {
      if (conditionsLoading || !conditionsData) return null;

      return (
        <ViewThree
          // data props here
          data={{ conditionsPerYear: conditionsData.conditionsPerYear }}
          loading={conditionsLoading}
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
  }),
  {
    setSelectedFeature: selectedCreators.setSelectedFeature,
    setSelectedSubFeature: selectedCreators.setSelectedSubFeature,
    setSelectedCondition: selectedCreators.setSelectedCondition,
    setBubbleChartIndicator: chartIndicatorCreators.setBubbleChartIndicator,
    expandDetailView: detailViewExpandedCreators.toggleDetailView,
  },
)(ViewThreeGraphQL);
