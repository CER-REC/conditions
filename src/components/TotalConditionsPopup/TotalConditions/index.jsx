import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

import PopupBtn from '../../PopupBtn';

const TotalConditions = ({ closeModal }) => (
  <div className="TotalConditions pad-bottom">
    <FormattedMessage id="components.modal.totalConditions.title" tagName="h2" />
    <FormattedMessage id="components.modal.totalConditions.explanation" tagName="p" />
    <FormattedMessage id="components.modal.totalConditions.example" tagName="p" />
    <AdvancedFormattedMessage
      id="components.modal.totalConditions.back"
      tag={PopupBtn}
      className="large bottom-right"
      icon="x"
      action={closeModal}
    />
  </div>
);

TotalConditions.propTypes = {

  closeModal: PropTypes.func.isRequired,
};

export default TotalConditions;
