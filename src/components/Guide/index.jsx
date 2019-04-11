import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CircleContainer from '../CircleContainer';

import './styles.scss';

const Guide = ({ textState }) => (
  /**
   * This wrapper div gets us around the fact that CSS' translate function measures
   * percentages relative to the element being translated; the Guide circle itself
   * can't use percentages for translating to a given position relative to the app.
   */
  <div className="Guide">
    <CircleContainer size={128}>
      {
        (textState > -1)
          ? <FormattedMessage id={`components.guide.tutorial.${textState}`} />
          : <div />
      }
    </CircleContainer>
  </div>
);

Guide.propTypes = {
  textState: PropTypes.number.isRequired,
};

export default Guide;
