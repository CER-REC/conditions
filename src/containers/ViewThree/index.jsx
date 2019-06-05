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
import displayOrder from '../../mockData/displayOrder';
import './styles.scss';
import * as selectedCreators from '../../actions/selected';
import * as detailViewExpandedCreators from '../../actions/detailViewExpanded';

class ViewThree extends React.PureComponent {
  render() {
    const { props } = this;
    const conditionCounts = props.conditionsPerYear;

    this.reversedCounts = this.reversedCounts || conditionCounts.slice().reverse();

    const currentDisplayOrder = (props.selected.feature === 'instrument')
      ? props.prefixOrder
      : displayOrder.features[props.selected.feature];

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
            displayOrder={currentDisplayOrder}
            onChange={props.setSelectedSubFeature}
            selected={props.selected.subFeature}
          />
        </section>
        <section className="chart">
          <StreamGraph
            countsData={this.reversedCounts}
            displayOrder={currentDisplayOrder}
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
            displayOrder={currentDisplayOrder}
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
  // eslint-disable-next-line react/no-unused-prop-types
  layoutOnly: PropTypes.bool,
  chartIndicatorPosition: PropTypes.shape({
    stream: PropTypes.number.isRequired,
  }).isRequired,
  selected: PropTypes.shape({
    feature: PropTypes.string.isRequired,
    subFeature: PropTypes.string,
    condition: PropTypes.shape({
      instrumentIndex: PropTypes.number.isRequired,
      itemIndex: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  setSelectedFeature: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  setSelectedSubFeature: PropTypes.func.isRequired,
};

ViewThree.defaultProps = {
  layoutOnly: PropTypes.false,
};

export const ViewThreeUnconnected = ViewThree;

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
    expandDetailView: detailViewExpandedCreators.toggleDetailView,
  },
)(ViewThree);
