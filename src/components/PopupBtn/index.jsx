import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import handleInteraction from '../../utilities/handleInteraction';

import './styles.scss';

const plusPath = `
  M 46 28
  a 4 4 0 0 1 8,0
  v 18
  h 18
  a 4 4 0 0 1 0,8
  h -18
  v 18
  a 4 4 0 0 1 -8,0
  v -18
  h -18
  a 4 4 0 0 1 0,-8
  h 18
  v -18
  Z
`;

const icons = {
  plus: (
    <svg className="buttonIcon" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" />
      <path fill="white" d={plusPath} />
    </svg>
  ),
  x: (
    <svg className="buttonIcon" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" />
      <path fill="white" d={plusPath} transform="rotate(45 50 50)" />
    </svg>
  ),
};

const PopupBtn = ({ action, children, icon, attributes, className }) => {
  const classes = classNames('PopupBtn', className);
  return (
    (typeof action === 'string')
      ? (
        <a className={classes} href={action} {...attributes}>
          {<div>{children}</div>}
          {icons[icon]}
        </a>
      )
      : (
        <button className={classes} type="button" {...handleInteraction(action)}>
          {children}
          {icons[icon]}
        </button>
      )
  );
};

PopupBtn.propTypes = {
  /** If given a string, will render an <a> and pass this as the URL. If given a function, will
   * render a <button> and pass this as onClick */
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  /** Attributes (i.e. target="_blank") to pass to the element */
  attributes: PropTypes.shape({}),
  /** Label */
  children: PropTypes.string.isRequired,
  /** Icon to be displayed */
  icon: PropTypes.oneOf(['plus', 'x']).isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

PopupBtn.defaultProps = {
  attributes: {},
  className: '',
};

export default PopupBtn;
