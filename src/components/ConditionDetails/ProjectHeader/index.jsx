import React from 'react';
import PropTypes from 'prop-types';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

import CountBubble from '../../CountBubble';

import handleInteraction from '../../../utilities/handleInteraction';
import { reportAnalytics } from '../../../utilities/analyticsReporting';

import './styles.scss';

const lessButton = (
  <>
    <AdvancedFormattedMessage
      id="components.conditionDetails.less"
      className="upperCase"
      tag="h1"
    />
    <svg className="arrow" viewBox="0 0 16 24">
      <polyline points="4,4 12,12.5 4,20 4,4" />
    </svg>
  </>
);

const moreButton = (
  <>
    <svg className="arrow" viewBox="0 0 16 24">
      <polyline points="12,4 4,12.5 12,20 12,4" />
    </svg>
    <AdvancedFormattedMessage
      id="components.conditionDetails.more"
      className="upperCase"
      tag="h1"
    />
  </>
);

class ProjectHeader extends React.PureComponent {
  static propTypes = {
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
    companies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })).isRequired,
  }

  static defaultProps = {
    isExpandable: false,
    expanded: false,
    browseBy: 'company',
    counts: {
      instruments: 0,
      conditions: 0,
    },
  }

  handleOpenProjectDetails = (e) => {
    const valueObj = {
      conditionCount: this.props.counts.conditions,
      instrumentCount: this.props.counts.instruments,
      value: this.props.selectedProject,
    };

    reportAnalytics(e.type, 'projects', 'project', valueObj);
    this.props.openProjectDetails();
  }

  renderProjectName = () => {
    if (this.props.selectedProject === '') {
      return (<div className="openProject" />);
    }

    const formattedProjectName = this.props.selectedProject.length > 68
      ? `${this.props.selectedProject.substring(0, 68)}...`
      : this.props.selectedProject;

    return (this.props.companies.length > 1 ? (
      <button
        type="button"
        className="openProject"
        {...handleInteraction(this.handleOpenProjectDetails)}
      >
        <h2 title={this.props.selectedProject}>
          <span className="projectName">{formattedProjectName}</span>
          <span className="asterisk">*</span>
        </h2>
      </button>
    ) : (
      <h2 title={this.props.selectedProject}>
        <span className="projectName">{formattedProjectName}</span>
      </h2>
    ));
  }

  render() {
    return (
      <div className="ProjectHeader">
        <div className="topBar">
          {(this.props.browseBy === 'company')
            ? (
              <>
                <AdvancedFormattedMessage
                  id="components.conditionDetails.selectedProject"
                  tag="h1"
                />
                {this.renderProjectName()}
              </>
            )
            : (
              <>
                <AdvancedFormattedMessage
                  id="components.conditionDetails.selectedCondition"
                  tag="h1"
                />
                <div className="openProject" />
              </>
            )}
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
        {(this.props.counts.instruments)
          ? (
            <div className="counts">
              <CountBubble count={this.props.counts.instruments} textId="instruments" />
              <CountBubble count={this.props.counts.conditions} textId="conditions" />
            </div>
          )
          : null}
      </div>
    );
  }
}

export default ProjectHeader;
