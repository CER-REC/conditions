import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import ProjectHeader from './ProjectHeader';
import ConditionList from './ConditionList';
import Content from './Content';
import Details from './Details';

class ConditionDetails extends React.Component {
  findSelectedItem = () => {
    let count = 0;
    for (let i = 0, l = this.props.selectedItem.instrumentIndex; i < l; i += 1) {
      count += this.props.data[i].conditions.length + 1;
    }

    return count + this.props.selectedItem.itemIndex + 1;
  };

  textMatchesKeywords = (text) => {
    const lowerText = text.toLowerCase();
    const match = words => words && words.some(word => lowerText.match(word.toLowerCase()));

    return (
      match(this.props.searchKeywords.include)
      && !match(this.props.searchKeywords.exclude));
  }

  getListData = () => this.props.data.reduce(
    (data, instrument, instrumentIndex) => {
      data.push({
        isInstrument: true,
        instrumentIndex,
        instrumentNumber: instrument.instrumentNumber,
        itemIndex: -1,
      });

      instrument.conditions.forEach((condition, itemIndex) => {
        const marked = this.textMatchesKeywords(condition.text);
        data.push({
          length: condition.length,
          fill: condition.fill,
          marked,
          instrumentIndex,
          itemIndex,
        });
      });

      return data;
    }, [],
  );

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
      items={this.getListData()}
      selectedItem={this.findSelectedItem()}
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

  renderDetails = (instrument, index) => ((index === -1)
    ? null
    : <Details {...instrument.conditions[index].details} />
  )

  render() {
    const instrument = this.props.data[this.props.selectedItem.instrumentIndex];
    const index = this.props.selectedItem.itemIndex;

    return (
      <section className={`ConditionDetails ${(this.props.expanded) ? 'expanded' : ''}`}>
        <div className="main">
          {this.renderHeader()}
          <div className="listPane">{this.renderList()}</div>
          <div className="contentPane">{this.renderContent(instrument, index)}</div>
        </div>
        <div className="popout">
          {this.renderDetails(instrument, index)}
        </div>
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
