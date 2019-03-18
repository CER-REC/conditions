import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import handleInteraction from '../../../utilities/handleInteraction';
import './styles.scss';

const Tab = (props) => {
  let icon;
  let type;

  if (props.isFilter) {
    type = 'filter';
    icon = (
      <polygon
        className="filterIcon"
        points="37.9,3.1 107.6,142.5 107.6,281.8 177.3,212.1 177.3,142.5 247,3.1"
      />
    );
  } else {
    type = 'find';
    icon = (
      <g className="findIcon">
        <path
          d="M135,93.1l139.8,136.8c9.2,9,9.2,23.4,0,32.4l0,
            0c-9.2,9-23.9,9-33.1,0L101.9,125.5c-9.2-9-9.2-23.4,0-32.4
            l0,0C109.2,84.1,125.8,84.1,135,93.1z"
        />
        <ellipse
          cx="120.2"
          cy="112.3"
          rx="104.8"
          ry="102.6"
        />
      </g>
    );
  }

  return (
    <div
      className={classNames('Tab', { inactiveTab: !props.isActive })}
      {...handleInteraction(props.onClick)}

    >
      <FormattedMessage id={`components.searchBar.tab.${type}`}>
        {txt => <span className="tabText"> {txt} </span>}
      </FormattedMessage>
      <span className="iconSvg">
        <svg width={15} viewBox="0 0 284.9 284.9">
          {icon}
        </svg>
      </span>
      <div className={classNames('bottom', { active: props.isActive })} />
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
