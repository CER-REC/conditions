import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const GreyPipe = ({ mode }) => (
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
    <div className="vertical" />
    <div className="bottom" />
    {mode === 'location' ? <div className="bottomConnection" /> : null}
  </div>
);

GreyPipe.propTypes = {
  mode: PropTypes.oneOf(['company', 'location']).isRequired,
};

export default GreyPipe;
