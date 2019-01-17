import React from 'react';
import PropTypes from 'prop-types';

const RegionalCompanies = (props) => {
  const { companies, activeConditionCompanies, openProjectDetails } = props;
  const companyItems = companies.map(company => <li>{company}</li>);
  return (
    <div className="RegionalCompanies">
      <ul>
        {companyItems}
      </ul>
    </div>
  );
};

RegionalCompanies.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeConditionCompanies: PropTypes.arrayOf(PropTypes.string).isRequired,
  openProjectDetails: PropTypes.func.isRequired,
};

export default RegionalCompanies;
