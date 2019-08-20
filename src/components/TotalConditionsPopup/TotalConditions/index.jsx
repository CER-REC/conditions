import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

import PopupBtn from '../../PopupBtn';

import './styles.scss';

const TotalConditions = ({ closeModal }) => (
  <div className="TotalConditions">
    <div className="Header">
      <FormattedMessage id="components.modal.totalConditions.title" />
    </div>
    <div className="Description">
      <div className="Explanation">
        <FormattedMessage id="components.modal.totalConditions.explanation" />
      </div>
      <div className="Example">
        <FormattedMessage id="components.modal.totalConditions.example" />
      </div>
    </div>
    <AdvancedFormattedMessage
      id="components.modal.totalConditions.back"
      tag={PopupBtn}
      icon="x"
      action={closeModal}
    />
  </div>
);

TotalConditions.propTypes = {

  closeModal: PropTypes.func.isRequired,
};

export default TotalConditions;
