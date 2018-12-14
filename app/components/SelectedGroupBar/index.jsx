import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const SelectedGroupBar = props => (
  <div
    className="SelectedGroupBar"
  >
    <p style={{ background: props.color }}>
      <span style={{
        fontSize: props.groupSize,
      }}
      >
        {props.group}
      </span>
      &nbsp;:&nbsp;
      <span style={{
        fontSize: props.groupItemSize,
      }}
      >
        {props.groupItem}
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
  color: '',
  groupSize: '16px',
  groupItemSize: '14px',
};

export default SelectedGroupBar;
