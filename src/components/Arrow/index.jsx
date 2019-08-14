import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import classNames from 'classnames';

const Arrow = (props) => {
  const line = ' 5, 16 10.5,4 11.5,4 17,16 15.5,16 11,6.5 6.5,16 5,16 ';
  return (
    <div className={classNames('Arrow', props.orientation)}>
      <svg width="22" height="22">
        <polyline points={line} />
      </svg>
    </div>
  );
};
Arrow.propTypes = {
  orientation: PropTypes.oneOf(['Up', 'Down', 'Left', 'Right']).isRequired,
};

export default React.memo(Arrow);
