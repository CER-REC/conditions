import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import handleInteraction from '../../../utilities/handleInteraction';
import './styles.scss';

const Tab = (props) => {
  const borderStyle = (props.isActive) ? 'none' : '1px solid';

  const renderedText = (props.isFilter)
    ? (
      <FormattedMessage id="components.SearchBar.filter.filter">
        { text => (<div className="filterText">{text}</div>) }
      </FormattedMessage>
    )
    : (
      <FormattedMessage id="components.SearchBar.findWords.findWords">
        { text => (<div className="findText">{text}</div>) }
      </FormattedMessage>
    );

  const renderedIcon = (props.isFilter)
    ? (
      <path
        className="filterIcon"
        d="M252.46,239.85a.48.48,0,0,0-.42-.27H238a.47.47,0,0,0-.41.27.46.46,0,0,0,
    .06.48l5.42,6.59V253a.46.46,0,0,0,.21.39.44.44,0,0,0,.24.07.54.54,0,0,0,.21,0l3-1.51a
    .46.46,0,0,0,.25-.41v-4.56l5.42-6.59A.46.46,0,0,0,252.46,239.85Zm-6.29,6.62a.48.48,0,
    0,0-.1.28v4.45l-2.13,1.06v-5.5a.48.48,0,0,0-.1-.29l-4.91-6h12.16Z"
        transform="translate(-237.5 -238.58)"
      />
    )
    : (
      <path
        className="findIcon"
        d="M263.37,262.74l-3.65-3.65a6.4,6.4,0,1,0-.63.63l3.65,3.65a.42.42,0,
    0,0,.31.13.44.44,0,0,0,.32-.13A.45.45,0,0,0,263.37,262.74Zm-14-7.84a5.5,5.5,0,
    1,1,5.5,5.5A5.5,5.5,0,0,1,249.39,254.9Z"
        transform="translate(-247.9 -247.9)"
      />
    );
  return (
    <div className="Tab" {...handleInteraction(props.onClick)} style={{ borderBottom: borderStyle }}>
      {renderedText}
      <span className="iconSvg">
        <svg width={15} viewBox="0 0 15 15">
          {renderedIcon}
        </svg>
      </span>
    </div>
  );
};

Tab.propTypes = {
  isFilter: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

Tab.defaultProps = {
  isFilter: false,
};

export default Tab;
