import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const SelectedGroupBar = props => (
  <div
    className="SelectedGroupBar"
    color={props.color}
    groupsize={props.groupsize}
    groupitemsize={props.groupitemsize}
  >
    <p>{`${props.group} : ${props.groupitem}`}</p>
  </div>
);

SelectedGroupBar.propTypes = {
  group: PropTypes.string.isRequired,
  groupitem: PropTypes.string.isRequired,
  groupsize: PropTypes.string,
  groupitemsize: PropTypes.string,
  color: PropTypes.string,
};

SelectedGroupBar.defaultProps = {
  color: '#fefefe',
  groupsize: '16px',
  groupitemsize: '14px',
};

export default SelectedGroupBar;
