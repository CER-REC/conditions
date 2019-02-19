import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import ProjectHeader from './ProjectHeader';
import ConditionList from './ConditionList';
import Content from './Content';
import Details from './Details';

class ConditionDetails extends React.Component {
  renderHeader = () => (
    <ProjectHeader
      isExpandable={this.props.isExpandable}
      expanded={this.props.expanded}
      selectedProject={this.props.selectedProject}
      openProjectDetails={this.props.openProjectDetails}
      toggleExpanded={this.props.toggleExpanded}
    />
  )

  renderList = () => (
    <ConditionList
      searchKeywords={this.props.searchKeywords}
      data={this.props.data}
      selectedItem={this.props.selectedItem}
      updateSelectedItem={this.props.updateSelectedItem}
    />
  )

  renderContent = () => (
    <Content
      instrument={this.props.data[this.props.selectedItem.instrumentIndex]}
      itemIndex={this.props.selectedItem.itemIndex}
      openIntermediatePopup={this.props.openIntermediatePopup}
    />
  )

  renderDetails = (instrument, index) => {
    const { details } = instrument.conditions[index];

    return (index === -1)
      ? null
      : (
        <Details
          theme={details.theme}
          instrument={details.instrument}
          phase={details.phase}
          type={details.type}
          status={details.status}
          filing={details.filing}
        />
      );
  }

  render() {
    const instrument = this.props.data[this.props.selectedItem.instrumentIndex];
    const index = this.props.selectedItem.itemIndex;

    return this.props.expanded
      ? (
        <section className="ConditionDetails expanded">
          <div className="gridCell header">{this.renderHeader()}</div>
          <div className="gridCell list">{this.renderList()}</div>
          <div className="gridCell blank" />
          <div className="gridCell content">{this.renderContent(instrument, index)}</div>
          <div className="gridCell details">{this.renderDetails(instrument, index)}</div>
        </section>
      ) : (
        <section className="ConditionDetails">
          <div className="gridCell header">{this.renderHeader()}</div>
          <div className="gridCell list">{this.renderList()}</div>
          <div className="gridCell content">{this.renderContent(instrument, index)}</div>
        </section>
      );
  }
}

ConditionDetails.propTypes = {
  isExpandable: PropTypes.bool,
  expanded: PropTypes.bool,
  selectedProject: PropTypes.string.isRequired,
  searchKeywords: PropTypes.shape({
    include: PropTypes.arrayOf(PropTypes.string),
    exclude: PropTypes.arrayOf(PropTypes.string),
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    instrument: PropTypes.object,
    conditions: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
  selectedItem: PropTypes.shape({
    instrumentIndex: PropTypes.number,
    itemIndex: PropTypes.number,
  }),
  openProjectDetails: PropTypes.func.isRequired,
  openIntermediatePopup: PropTypes.func.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  updateSelectedItem: PropTypes.func.isRequired,
};

ConditionDetails.defaultProps = {
  isExpandable: false,
  expanded: false,
  searchKeywords: { include: [], exclude: [] },
  selectedItem: { instrumentIndex: 0, itemIndex: -1 },
};

export default ConditionDetails;
