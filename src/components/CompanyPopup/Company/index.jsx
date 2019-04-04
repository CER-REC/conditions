import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import PopupBtn from '../../PopupBtn';

import './styles.scss';

const Company = ({ projectName, companies, closeModal }) => (
  <div className="Company">
    <FormattedMessage id="components.modal.company.name">
      {text => <h2>{text} <strong>{projectName}</strong></h2>}
    </FormattedMessage>
    <FormattedMessage id="components.modal.company.associated" tagName="h3" />
    <ul className="companies">
      {companies.map(company => <li key={company}>{company}</li>)}
    </ul>
    <FormattedMessage id="components.modal.company.meaningHeading" tagName="h4" />
    <FormattedMessage id="components.modal.company.meaningText" tagName="p" />
    <FormattedMessage id="components.modal.company.back">
      {text => (
        <PopupBtn text={text} icon="x" action={closeModal} />
      )}
    </FormattedMessage>
  </div>
);

Company.propTypes = {
  projectName: PropTypes.string.isRequired,
  companies: PropTypes.arrayOf(PropTypes.string).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Company;
