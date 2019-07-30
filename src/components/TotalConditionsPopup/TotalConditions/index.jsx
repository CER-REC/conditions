import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import PopupBtn from '../../PopupBtn';

import './styles.scss';

const TotalConditions = ({ closeModal }) => (
  <div className="TotalConditions">
    <div className="Header">
      <FormattedMessage id="components.modal.totalConditions.title" />
    </div>
    <div className="Description">
      <div className="Explanation">
        <FormattedMessage id="components.modal.totalConditions.description1" />
      </div>
      <div className="Example">
        <FormattedMessage id="components.modal.totalConditions.description2" />
      </div>
    </div>
    <FormattedMessage id="components.modal.company.back">
      {text => <PopupBtn text={text} icon="x" action={closeModal} />}
    </FormattedMessage>
  </div>
);

TotalConditions.propTypes = {

  closeModal: PropTypes.func.isRequired,
};

export default TotalConditions;
