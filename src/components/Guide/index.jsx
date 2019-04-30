import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CircleContainer from '../CircleContainer';

import './styles.scss';

// Just so there's something to map over in the JSX
const dummyArray = new Array(8).fill(null);

const Guide = ({ textState, onClick }) => (
  /**
   * This wrapper div gets us around the fact that CSS' translate function measures
   * percentages relative to the element being translated; the Guide circle itself
   * can't use percentages for translating to a given position relative to the app.
   */
  <div className="Guide">
    <CircleContainer size={176} onClick={onClick}>
      {
        dummyArray.map((_, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <FormattedMessage id={`components.guide.tutorial.${idx}`} key={idx}>
            {text => <span className={(idx === textState) ? '' : 'hidden'}>{text}</span>}
          </FormattedMessage>
        ))
      }
    </CircleContainer>
  </div>
);

Guide.propTypes = {
  textState: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Guide;
