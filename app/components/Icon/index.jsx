import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './styles.scss';

library.add(
  faGoogle,
  faArchive,
);


const Icon = props => (
  <div className="Icon">
    <FontAwesomeIcon
      icon={[props.prefix, props.icon]}
      className={props.className}
      size={props.size}
      color={props.color}
    />
  </div>);

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
  prefix: 'fas',
  size: '5x',
  color: 'tomato',
};
export default Icon;
