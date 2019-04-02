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

const PopupBtn = ({ linkUrl, onClick, text, icon, attributes, className }) => {
  const classes = classNames('PopupBtn', className);
  return (
    (linkUrl !== '')
      ? (
        <a className={classes} href={linkUrl} {...attributes}>
          {<div>{text}</div>}
          {icons[icon]}
        </a>
      )
      : (
        <button className={classes} type="button" {...handleInteraction(onClick)}>
          {text}
          {icons[icon]}
        </button>
      )
  );
};

PopupBtn.propTypes = {
  linkUrl: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  attributes: PropTypes.shape({}),
  className: PropTypes.string,
};

PopupBtn.defaultProps = {
  linkUrl: '',
  onClick: () => {},
  attributes: {},
  className: '',
};

export default PopupBtn;
