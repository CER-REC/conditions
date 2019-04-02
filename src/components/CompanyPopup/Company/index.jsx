import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../../utilities/handleInteraction';

import './styles.scss';

const localeStr = id => `components.modal.company.${id}`;

const plusPath = `
  M 46 28
  a 4 4 0 0 1 8,0
  v 18
  h 18
  a 4 4 0 0 1 0,8
  h -18
  v 18
  a 4 4 0 0 1 -8,0
  v -18
  h -18
  a 4 4 0 0 1 0,-8
  h 18
  v -18
  Z
`;

const xIcon = (
  <svg className="buttonIcon" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" />
    <path fill="white" d={plusPath} transform="rotate(45 50 50)" />
  </svg>
);

const Company = ({ projectName, companies, closeModal }) => (
  <div className="Company">
    <FormattedMessage id={localeStr('name')}>
      {text => <h3>{text} <strong>{projectName}</strong></h3>}
    </FormattedMessage>
    <FormattedMessage id={localeStr('associated')} tagName="h4" />
    <p>
      {companies.map(company => (
        <React.Fragment key={company}>
          {company}<br />
        </React.Fragment>
      ))}
    </p>
    <FormattedMessage id={localeStr('meaningHeading')} tagName="h4" />
    <FormattedMessage id={localeStr('meaningText')} tagName="p" />
    <FormattedMessage id={localeStr('back')}>
      {text => (
        <button type="button" {...handleInteraction(closeModal)}>
          {text}
          {xIcon}
        </button>
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
