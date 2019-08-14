import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

import PopupBtn from '../../PopupBtn';

import { regDocsUrl } from '../../../constants';

import './styles.scss';

const checkIcon = (
  <svg className="checkIcon" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" />
    <polyline points="33 45, 45 55, 70 31, 76 37, 45 72, 25 53" />
  </svg>
);

const linkAttributes = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

const RegDocs = ({ document, closeModal }) => {
  const linkUrl = `${regDocsUrl}${document}`;

  return (
    <div className="RegDocs">
      <FormattedMessage
        id="components.modal.regdocs.searchFor"
        values={{
          instrument: (<strong>#{document}</strong>),
          regdocs: (<FormattedMessage id="components.modal.regdocs.regdocs" tagName="strong" />),
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
        attributes={linkAttributes}
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
  document: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default React.memo(RegDocs);
