import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import PopupBtn from '../../PopupBtn';

import './styles.scss';

const Company = ({ projectName, companies, closeModal }) => (
  <div className="Company">
    <FormattedMessage id="components.modal.company.name">
      {text => <h2>{text}: <strong>{projectName}</strong></h2>}
    </FormattedMessage>
    <FormattedMessage id="components.modal.company.associated">
      {text => <h3>{text}:</h3>}
    </FormattedMessage>
    <ul className="companies">
      {companies.map(company => <li key={company}>{company}</li>)}
    </ul>
    <FormattedMessage id="components.modal.company.meaningHeading" tagName="h4" />
    <FormattedMessage id="components.modal.company.meaningText">
      {(text) => {
        const arr = text.split('\n');
        const first = arr.shift();
        const items = arr.map(bullet => <li key={bullet}>{bullet.match(/- ?(.+)/)[1]}</li>);

        return (
          <React.Fragment>
            <p>{first}</p>
            <ul className="bullets">
              {items}
            </ul>
          </React.Fragment>
        );
      }}
    </FormattedMessage>
    <FormattedMessage id="components.modal.company.back">
      {text => <PopupBtn icon="x" action={closeModal}>{text}</PopupBtn>}
    </FormattedMessage>
  </div>
);

Company.propTypes = {
  projectName: PropTypes.string.isRequired,
  companies: PropTypes.arrayOf(PropTypes.string).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Company;
