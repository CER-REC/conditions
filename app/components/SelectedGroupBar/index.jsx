import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const SelectedGroupBar = props => (
  <div
    className="SelectedGroupBar"
    color={props.color}
  >
    <p>
      <span style={{
        fontSize: props.groupSize,
      }}
      >
        {`${props.group} : `}
      </span>
      <span style={{
        fontSize: props.groupItemSize,
      }}
      >
        {`${props.groupItem}`}
      </span>
    </p>
  </div>
);

SelectedGroupBar.propTypes = {
  group: PropTypes.string.isRequired,
  groupSize: PropTypes.string,
  groupItem: PropTypes.string.isRequired,
  groupItemSize: PropTypes.string,
  color: PropTypes.string,
};

SelectedGroupBar.defaultProps = {
  color: '#fefefe',
  groupSize: '16px',
  groupItemSize: '14px',
};

export default SelectedGroupBar;
