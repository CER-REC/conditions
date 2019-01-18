import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './styles.scss';

const RegionCompanies = (props) => {
  const { companies, activeConditionCompanies, openProjectDetails } = props;
  const asterisk = <button type="button" className="asterisk" onClick={openProjectDetails}>*</button>;
  const companyItems = companies
    .sort((a, b) => a.localeCompare(b))
    .map((company) => {
      const active = !activeConditionCompanies.includes(company) ? null : asterisk;
      return (<li key={company}>{company}{active}</li>);
    });
  return (
    <div className="RegionCompanies">
      <div className="title">
        <FormattedMessage id="components.regionCompanies.title" />
      </div>
      <ul>
        {companyItems}
      </ul>
    </div>
  );
};

RegionCompanies.propTypes = {
  /** A List of the companies that belong to the region */
  companies: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Companies that belong to the selected condition */
  activeConditionCompanies: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** A function for opening up the dialog to project details */
  openProjectDetails: PropTypes.func.isRequired,
};

export default RegionCompanies;
