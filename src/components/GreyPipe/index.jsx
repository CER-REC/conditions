import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

import CountBubble from './CountBubble';

const GreyPipe = ({ mode, countData }) => (
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
      {(mode === 'company')
        ? (
          <React.Fragment>
            <CountBubble count={countData.conditions} textId="conditions" />
            <CountBubble count={countData.instruments} textId="instruments" />
            <CountBubble count={countData.projects} textId="projects" />
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
  countData: PropTypes.shape({
    conditions: PropTypes.number,
    instruments: PropTypes.number,
    projects: PropTypes.number,
  }),
};

GreyPipe.defaultProps = {
  countData: {
    conditions: 0,
    instruments: 0,
    projects: 0,
  },
};
export default GreyPipe;
