import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

import handleInteraction from '../../../utilities/handleInteraction';
import { handleAnalyticsInteraction } from '../../../utilities/analyticsReporting';

import './styles.scss';

const RegionCompanies = (props) => {
  const { companies, activeConditionCompanies, openProjectDetails, selectCompany } = props;
  const companyItems = companies
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((company) => {
      if (company.id === 0) { return null; }

      const companyButton = (
        <button
          type="button"
          {...handleAnalyticsInteraction(
            'select company in region',
            company.name,
            selectCompany,
            company.id,
          )}
        >
          {company.name}
        </button>
      );
      const active = !activeConditionCompanies.includes(company.id)
        ? null
        : <button type="button" className="asterisk" {...handleInteraction(openProjectDetails, company.id)}>*</button>;
      return (<li title={company.name} key={company.id}>{companyButton}{active}</li>);
    });
  return (
    <div className="RegionCompanies">
      <div className="title">
        <AdvancedFormattedMessage
          id="components.regionSummary.regionCompanies.title"
          className="companies"
        />
        <AdvancedFormattedMessage
          id="components.regionSummary.regionCompanies.select"
          className="select"
        />
      </div>
      <ul className={classNames({ hidden: props.isHidden })}>
        {companyItems}
      </ul>
    </div>
  );
};

RegionCompanies.propTypes = {
  /** A List of the companies that belong to the region */
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** A List of ID's of companies that belong to selected condition */
  activeConditionCompanies: PropTypes.arrayOf(PropTypes.number).isRequired,
  /** A function for selecting a company and switching to Company mode */
  selectCompany: PropTypes.func.isRequired,
  /** A function for opening up the dialog to project details */
  openProjectDetails: PropTypes.func.isRequired,
  /** A class to hide or show the component according to the movement of the wheel */
  isHidden: PropTypes.bool,
};

RegionCompanies.defaultProps = {
  isHidden: false,
};

export default React.memo(RegionCompanies);
