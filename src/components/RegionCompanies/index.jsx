import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../utilities/handleInteraction';

import './styles.scss';

const RegionCompanies = (props) => {
  const { companies, activeConditionCompanies, openProjectDetails } = props;
  const companyItems = companies
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((company) => {
      const active = !activeConditionCompanies.includes(company.id)
        ? null
        : <button type="button" className="asterisk" {...handleInteraction(openProjectDetails, company.id)}>*</button>;
      return (<li key={company.id}>{company.name}{active}</li>);
    });
  return (
    <div className={classNames('RegionCompanies', props.className)}>
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
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** A List of ID's of companies that belong to selected condition */
  activeConditionCompanies: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** A function for opening up the dialog to project details */
  openProjectDetails: PropTypes.func.isRequired,
  /** A class to hide or show the component according to the movement of the wheel */
  className: PropTypes.string,
};

RegionCompanies.defaultProps = {
  className: '',
};

export default RegionCompanies;
