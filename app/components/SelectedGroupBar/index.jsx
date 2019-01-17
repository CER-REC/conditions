import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import './styles.scss';

const SelectedGroupBar = props => (
  <div className="SelectedGroupBar">
    <p style={{ background: props.backgroundColor, fontSize: props.groupSize }}>
      <FormattedMessage id={props.group}>{text => text}</FormattedMessage>:
      <span style={{ fontSize: props.groupItemSize }}>{props.children}</span>
    </p>
  </div>
);

SelectedGroupBar.propTypes = {
  /** The translation path to the Label of the group (ex. components.companyWheel.wheelRay.title) */
  group: PropTypes.string.isRequired,
  /** Label font size */
  groupSize: PropTypes.string,
  /** Pre translated text to be rendered as a group item */
  children: PropTypes.node.isRequired,
  /** The font size of the groupItem */
  groupItemSize: PropTypes.string,
  /** The background colour of the selected group bar */
  backgroundColor: PropTypes.string,
};

SelectedGroupBar.defaultProps = {
  backgroundColor: '',
  groupSize: '16px',
  groupItemSize: '14px',
};

export default SelectedGroupBar;
