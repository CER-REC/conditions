import React from 'react';
import PropTypes from 'prop-types';

import {
  displayOrder as displayOrderType,
  aggregatedFeatureData,
  featureTypes,
} from '../../proptypes';

import RegionConditions from './RegionConditions';
import RegionCompanies from './RegionCompanies';

import './styles.scss';

const RegionSummary = ({
  selectedAggregatedCount,
  displayOrder,
  selectedFeature,
  companies,
  activeConditionCompanies,
  isHidden,
  openProjectDetails,
}) => (
  <div className="RegionSummary">
    <RegionConditions
      selectedFeature={selectedFeature}
      selectedAggregatedCount={selectedAggregatedCount}
      displayOrder={displayOrder}
      isHidden={isHidden}
    />
    <RegionCompanies
      companies={companies}
      activeConditionCompanies={activeConditionCompanies}
      isHidden={isHidden}
      openProjectDetails={openProjectDetails}
    />
  </div>
);

RegionSummary.propTypes = {
  /** A List of the companies that belong to the region */
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** A List of ID's of companies that belong to selected condition */
  activeConditionCompanies: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** A function for opening up the dialog to project details */
  openProjectDetails: PropTypes.func.isRequired,
  /** A class to hide or show the component according to the movement of the wheel */
  isHidden: PropTypes.bool,
  selectedAggregatedCount: aggregatedFeatureData,
  selectedFeature: featureTypes.isRequired,
  displayOrder: displayOrderType.isRequired,
};

RegionSummary.defaultProps = {
  isHidden: false,
  selectedAggregatedCount: null,
};

export default RegionSummary;
