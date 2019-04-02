import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import PopupBtn from '../../PopupBtn';

import './styles.scss';

const Company = ({ projectName, companies, closeModal }) => (
  <div className="Company">
    <FormattedMessage id="components.modal.company.name">
      {text => <h3>{text} <strong>{projectName}</strong></h3>}
    </FormattedMessage>
    <FormattedMessage id="components.modal.company.associated" tagName="h4" />
    <p>
      {companies.map(company => (
        <React.Fragment key={company}>
          {company}<br />
        </React.Fragment>
      ))}
    </p>
    <FormattedMessage id="components.modal.company.meaningHeading" tagName="h4" />
    <FormattedMessage id="components.modal.company.meaningText" tagName="p" />
    <FormattedMessage id="components.modal.company.back">
      {text => (
        <PopupBtn text={text} icon="x" onClick={closeModal} />
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
