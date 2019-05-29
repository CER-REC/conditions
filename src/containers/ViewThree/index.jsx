import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { connect } from 'react-redux';
import FeaturesMenu from '../../components/FeaturesMenu';
import SmallMultiplesLegend from '../../components/SmallMultiplesLegend';
import StreamGraph from '../../components/StreamGraph';
import FeatureDescription from '../../components/FeatureDescription';
import FeatureTypesDescription from '../../components/FeatureTypesDescription';
import ConditionDetails from '../../components/ConditionDetails';
import './styles.scss';
import displayOrder from '../../mockData/displayOrder';
import { allConditionsPerYear, conditionData } from '../../proptypes';
import * as selectedCreators from '../../actions/selected';
import * as chartIndicatorCreators from '../../actions/chartIndicatorPosition';
import * as detailViewExpandedCreators from '../../actions/detailViewExpanded';

class ViewThree extends React.PureComponent {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.loading === false;
  // }

  render() {
    const { props } = this;
    const conditionCounts = this.props.conditionsPerYear;

    this.reversedCounts = this.reversedCounts || conditionCounts.slice().reverse();

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
            displayOrder={props.displayOrder}
            onChange={props.setSelectedSubFeature}
            selected={props.selected.subFeature}
          />
        </section>
        <section className="chart">
          <StreamGraph
            countsData={this.reversedCounts}
            displayOrder={props.displayOrder}
            years={props.years}
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
            displayOrder={props.displayOrder}
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
  // <Query query={conditionsPerYear}>
  //   {({ data: conditionsData, loading: conditionsLoading }) => {
  //     if (conditionsLoading || !conditionsData) return null;

  //     return (
        <ViewThree
          // data props here
          // data={{ conditionsPerYear: conditionsData.conditionsPerYear }}
          // loading={conditionsLoading}
          {...props}
        />
  //     );
  //   }}
  // </Query>
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
