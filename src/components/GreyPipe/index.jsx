import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

import CountBubble from './CountBubble';

const GreyPipe = ({ mode, conditionCount, instrumentCount, projectCount }) => (
  <div className={classNames('GreyPipe', mode)}>
    {mode === 'location'
      ? <div className="topConnection" />
      : (
        <svg width="48" height="48" className="bottomSvg">
          <path d="M48 0 C48 0 48 48 0 48 L24 48 0 48 0 24 C0 24 24 24 24 0 L24 12 24 0" />
        </svg>
      )
    }
    <div className="top" />
    <div className="vertical">
      {(mode === 'company' && conditionCount !== null)
        ? (
          <React.Fragment>
            <CountBubble count={conditionCount} textId="conditions" />
            <CountBubble count={instrumentCount} textId="instruments" />
            <CountBubble count={projectCount} textId="projects" />
          </React.Fragment>
        )
        : null
      }
    </div>
    <div className="bottom" />
    {mode === 'location' ? <div className="bottomConnection" /> : null}
  </div>
);

GreyPipe.propTypes = {
  mode: PropTypes.oneOf(['company', 'location']).isRequired,
  conditionCount: PropTypes.number,
  instrumentCount: PropTypes.number,
  projectCount: PropTypes.number,
};

GreyPipe.defaultProps = {
  conditionCount: null,
  instrumentCount: null,
  projectCount: null,
};
export default GreyPipe;
