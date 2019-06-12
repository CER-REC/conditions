import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import handleInteraction from '../../../utilities/handleInteraction';
import CompanyPopup from '../../CompanyPopup';

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
  constructor(props) {
    super(props);
    this.state = {
      isCompanyPopupOpen: false,
    };
  }

  openCompanyPopup =() => {
    this.setState(prevState => ({ ...prevState, isCompanyPopupOpen: true }));
  }

  closeCompanyPopup = () => {
    this.setState(prevState => ({ ...prevState, isCompanyPopupOpen: false }));
  };

  render = () => (
    <div className={classNames('ProjectHeader', { location: this.props.browseBy === 'location' })}>
      {this.props.browseBy === 'company'
        ? (
          <React.Fragment>
            <FormattedMessage id="components.conditionDetails.selectedProject" tagName="h1" />
            <button
              type="button"
              className="openProject"
              {...handleInteraction(this.openCompanyPopup)}
            >
              <h2>{this.props.selectedProject}<span className="asterisk">*</span></h2>
            </button>
            <CompanyPopup
              projectName={this.props.selectedProject}
              closeModal={this.closeCompanyPopup}
              companies={this.props.companies}
              isOpen={this.state.isCompanyPopupOpen}
            />
          </React.Fragment>
        )
        : <FormattedMessage id="components.conditionDetails.selectedCondition" tagName="h1" />
      }
      <button
        type="button"
        className="toggleExpand"
        {...handleInteraction(this.props.toggleExpanded, !this.props.expanded)}
      >
        {this.props.expanded ? lessButton : moreButton}
      </button>
    </div>
  )
}

ProjectHeader.propTypes = {
  isExpandable: PropTypes.bool,
  expanded: PropTypes.bool,
  selectedProject: PropTypes.string.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  browseBy: PropTypes.oneOf(['company', 'location']),
  companies: PropTypes.arrayOf(PropTypes.string),
};

ProjectHeader.defaultProps = {
  isExpandable: false,
  expanded: false,
  browseBy: 'company',
  companies: [],
};

export default ProjectHeader;
