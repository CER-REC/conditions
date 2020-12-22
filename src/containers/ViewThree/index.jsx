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
import AdvancedFormattedMessage from '../../components/AdvancedFormattedMessage';
import PopupBtn from '../../components/PopupBtn';
import { displayOrder, allConditionsPerYearType } from '../../proptypes';
import './styles.scss';
import * as selectedCreators from '../../actions/selected';
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
      <SmallMultiplesLegend
        feature={props.selected.feature}
        allConditionsPerYear={props.allConditionsPerYear}
        displayOrder={props.displayOrder}
        onChange={props.setSelectedSubFeature}
        selected={props.selected.subFeature}
      />
    </section>
    <section className="chart">
      <StreamGraph
        allConditionsPerYear={props.allConditionsPerYear}
        displayOrder={props.displayOrder}
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
      <div className="selectedCompanyHeader">
        <FormattedMessage id="views.view3.company" tagName="h1" />
        <h2 className="companyName" title={props.companyName}>{props.companyName}</h2>
      </div>
    </section>

    {/* close button */}
    <AdvancedFormattedMessage
      id="components.modal.company.back"
      tag={PopupBtn}
      icon="x"
      action={props.onClose}
    />
  </section>
);

ViewThree.propTypes = {
  layoutOnly: PropTypes.bool,
  chartIndicatorPosition: PropTypes.shape({
    stream: PropTypes.number.isRequired,
  }).isRequired,
  selected: PropTypes.shape({
    feature: PropTypes.string.isRequired,
    subFeature: PropTypes.string,
  }).isRequired,
  setSelectedFeature: PropTypes.func.isRequired,
  setSelectedSubFeature: PropTypes.func.isRequired,
  displayOrder: displayOrder.isRequired,
  companyName: PropTypes.string.isRequired,
  allConditionsPerYear: allConditionsPerYearType.isRequired,
  onClose: PropTypes.func.isRequired,
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
