import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

import CountBubble from '../../CountBubble';

import handleInteraction from '../../../utilities/handleInteraction';

import './styles.scss';

const lessButton = (
  <React.Fragment>
    <AdvancedFormattedMessage
      id="components.conditionDetails.less"
      className="upperCase"
      tag="h1"
    />
    <svg className="arrow" viewBox="0 0 16 24">
      <polyline points="4,4 12,12.5 4,20 4,4" />
    </svg>
  </React.Fragment>
);

const moreButton = (
  <React.Fragment>
    <svg className="arrow" viewBox="0 0 16 24">
      <polyline points="12,4 4,12.5 12,20 12,4" />
    </svg>
    <AdvancedFormattedMessage
      id="components.conditionDetails.more"
      className="upperCase"
      tag="h1"
    />
  </React.Fragment>
);

const ProjectHeader = props => (
  <div className={classNames('ProjectHeader', { location: props.browseBy === 'location' })}>
    <div className="topBar">
      {props.browseBy === 'company'
        ? (
          <React.Fragment>
            <AdvancedFormattedMessage
              id="components.conditionDetails.selectedProject"
              tag="h1"
            />
            { props.selectedProject !== ''
              ? (
                <button
                  type="button"
                  className="openProject"
                  {...handleInteraction(props.openProjectDetails)}
                >
                  <h2 title={props.selectedProject}>
                    <span className="projectName">{props.selectedProject}</span>
                    <span className="asterisk">*</span>
                  </h2>
                </button>
              )
              : <div className="openProject" />
            }
          </React.Fragment>
        )
        : (
          <React.Fragment>
            <AdvancedFormattedMessage
              id="components.conditionDetails.selectedCondition"
              tag="h1"
            />
            <div className="openProject" />
          </React.Fragment>
        )
      }
      {!props.isExpandable ? null : (
        <button
          type="button"
          className="toggleExpand"
          {...handleInteraction(props.toggleExpanded, !props.expanded)}
        >
          {props.expanded ? lessButton : moreButton}
        </button>
      )}
    </div>
    <div className="counts">
      <CountBubble count={props.counts.instruments} textId="instruments" />
      <CountBubble count={props.counts.conditions} textId="conditions" />
    </div>
  </div>
);

ProjectHeader.propTypes = {
  isExpandable: PropTypes.bool,
  expanded: PropTypes.bool,
  selectedProject: PropTypes.string.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  browseBy: PropTypes.oneOf(['company', 'location']),
  openProjectDetails: PropTypes.func.isRequired,
  counts: PropTypes.shape({
    instruments: PropTypes.number,
    conditions: PropTypes.number,
  }),
};

ProjectHeader.defaultProps = {
  isExpandable: false,
  expanded: false,
  browseBy: 'company',
  counts: {
    instruments: 0,
    conditions: 0,
  },
};

export default ProjectHeader;
