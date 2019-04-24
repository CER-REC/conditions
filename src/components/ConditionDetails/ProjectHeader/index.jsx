import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import handleInteraction from '../../../utilities/handleInteraction';

import './styles.scss';

const lessButton = (
  <React.Fragment>
    <FormattedMessage id="components.conditionDetails.less">
      {text => <h1 className="upperCase">{text}</h1>}
    </FormattedMessage>
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
    <FormattedMessage id="components.conditionDetails.more">
      {text => <h1 className="upperCase">{text}</h1>}
    </FormattedMessage>
  </React.Fragment>
);

class ProjectHeader extends React.PureComponent {
  render = () => (
    <div className={classNames('ProjectHeader', { location: this.props.browseBy === 'location' })}>
      <FormattedMessage id="components.conditionDetails.selectedProject" tagName="h1" />
      <button
        type="button"
        className="openProject"
        {...handleInteraction(this.props.openProjectDetails, this.props.selectedProject)}
      >
        <h2>{this.props.selectedProject}<span className="asterisk">*</span></h2>
      </button>
      {this.props.isExpandable
        ? (
          <button
            type="button"
            className="toggleExpand"
            {...handleInteraction(this.props.toggleExpanded, !this.props.expanded)}
          >
            {this.props.expanded ? lessButton : moreButton}
          </button>
        ) : null
      }
    </div>
  )
}

ProjectHeader.propTypes = {
  isExpandable: PropTypes.bool,
  expanded: PropTypes.bool,
  selectedProject: PropTypes.string.isRequired,
  openProjectDetails: PropTypes.func.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  browseBy: PropTypes.oneOf(['company', 'location']),
};

ProjectHeader.defaultProps = {
  isExpandable: false,
  expanded: false,
  browseBy: 'company',
};

export default ProjectHeader;
