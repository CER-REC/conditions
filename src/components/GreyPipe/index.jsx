import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const GreyPipe = ({ mode }) => (
  <div className={classNames('GreyPipe', mode)}>
    {mode === 'location' ? <div className="horizontal" /> : null}
    <div className="top" />
    <div className="vertical" />
    <div className="bottom" />
  </div>
);

GreyPipe.propTypes = {
  mode: PropTypes.oneOf(['company', 'location']).isRequired,
};

export default GreyPipe;
