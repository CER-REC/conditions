import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

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

class ProjectHeader extends React.PureComponent {
  render = () => (
    <div className={classNames('ProjectHeader', { location: this.props.browseBy === 'location' })}>
      {this.props.browseBy === 'company'
        ? (
          <React.Fragment>
            <AdvancedFormattedMessage
              id="components.conditionDetails.selectedProject"
              tag="h1"
            />
            { this.props.selectedProject !== ''
              ? (
                <button
                  type="button"
                  className="openProject"
                  {...handleInteraction(this.props.openProjectDetails)}
                >
                  <h2 title={this.props.selectedProject}>
                    <span className="projectName">{this.props.selectedProject}</span>
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
      {!this.props.isExpandable ? null : (
        <button
          type="button"
          className="toggleExpand"
          {...handleInteraction(this.props.toggleExpanded, !this.props.expanded)}
        >
          {this.props.expanded ? lessButton : moreButton}
        </button>
      )}
    </div>
  )
}

ProjectHeader.propTypes = {
  isExpandable: PropTypes.bool,
  expanded: PropTypes.bool,
  selectedProject: PropTypes.string.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  browseBy: PropTypes.oneOf(['company', 'location']),
  openProjectDetails: PropTypes.func.isRequired,
};

ProjectHeader.defaultProps = {
  isExpandable: false,
  expanded: false,
  browseBy: 'company',
};

export default ProjectHeader;
