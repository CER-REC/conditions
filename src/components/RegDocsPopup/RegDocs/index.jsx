import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

import PopupBtn from '../../PopupBtn';

import './styles.scss';

const checkIcon = (
  <svg className="checkIcon" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" />
    <polyline points="33 45, 45 55, 70 31, 76 37, 45 72, 25 53" />
  </svg>
);

const RegDocs = ({ instrument, regDocsUrl, closeModal }) => {
  const linkUrl = `${regDocsUrl}${instrument}`;

  return (
    <div className="RegDocs">
      <FormattedMessage
        id="components.modal.regdocs.searchFor"
        values={{
          instrument: (<strong key="instrument">#{instrument}</strong>),
          regdocs: (<FormattedMessage id="components.modal.regdocs.regdocs" tagName="strong" key="regdocs" />),
        }}
        tagName="h3"
      />
      <p className="iconContainer">
        {checkIcon}
        <FormattedMessage id="components.modal.regdocs.found" />
      </p>
      <AdvancedFormattedMessage
        id="components.modal.regdocs.currentTab"
        tag={PopupBtn}
        icon="plus"
        action={linkUrl}
      />
      <AdvancedFormattedMessage
        id="components.modal.regdocs.newTab"
        tag={PopupBtn}
        icon="plus"
        action={linkUrl}
        attributes={{
          target: '_blank',
          rel: 'noopener noreferrer',
        }}
      />
      <AdvancedFormattedMessage
        id="components.modal.regdocs.cancel"
        tag={PopupBtn}
        icon="x"
        action={closeModal}
        className="cancel"
      />
      <FormattedMessage id="components.modal.regdocs.whatIsHeading" tagName="h4" />
      <FormattedMessage id="components.modal.regdocs.whatIsText" tagName="p" />
    </div>
  );
};

RegDocs.propTypes = {
  instrument: PropTypes.string.isRequired,
  regDocsUrl: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default RegDocs;
