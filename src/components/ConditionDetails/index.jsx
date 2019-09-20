import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'lodash.memoize';

import './styles.scss';

import ProjectHeader from './ProjectHeader';
import ConditionList from './ConditionList';
import Content from './Content';
import Details from './Details';

import { conditionData } from '../../proptypes';

class ConditionDetails extends React.PureComponent {
  static propTypes = {
    browseBy: PropTypes.oneOf(['company', 'location']),
    isExpandable: PropTypes.bool,
    expanded: PropTypes.bool,
    selectedProject: PropTypes.string.isRequired,
    searchKeywords: PropTypes.shape({
      include: PropTypes.arrayOf(PropTypes.string),
      exclude: PropTypes.arrayOf(PropTypes.string),
    }),
    counts: PropTypes.shape({
      instruments: PropTypes.number,
      conditions: PropTypes.number,
    }),
    data: conditionData.isRequired,
    selectedItem: PropTypes.shape({
      instrumentIndex: PropTypes.number,
      itemIndex: PropTypes.number,
    }),
    toggleExpanded: PropTypes.func,
    updateSelectedInstrument: PropTypes.func.isRequired,
    updateSelectedCondition: PropTypes.func.isRequired,
    openIntermediatePopup: PropTypes.func.isRequired,
    openProjectDetails: PropTypes.func.isRequired,
  };

  static defaultProps = {
    browseBy: 'company',
    isExpandable: false,
    expanded: false,
    counts: {
      instruments: 0,
      conditions: 0,
    },
    searchKeywords: { include: [], exclude: [] },
    selectedItem: { instrumentIndex: 0, itemIndex: -1 },
    toggleExpanded: () => {},
  };

  getListData = memoize(data => data.reduce(
    (acc, instrument, instrumentIndex) => {
      acc.push({
        isInstrument: true,
        instrumentIndex,
        instrumentId: instrument.id,
        instrumentNumber: instrument.instrumentNumber,
        itemIndex: -1,
      });

      instrument.conditions.forEach((condition, itemIndex) => {
        // TODO: This should be coming from the search instead
        const marked = this.textMatchesKeywords(condition.text);
        acc.push({
          binnedValue: condition.binnedValue,
          instrumentNumber: instrument.instrumentNumber,
          instrumentId: instrument.id,
          fill: condition.fill,
          conditionId: condition.id,
          marked,
          instrumentIndex,
          itemIndex,
        });
      });

      return acc;
    }, [],
  ));

  textMatchesKeywords = (text) => {
    if (!text) { return false; }
    const lowerText = text.toLowerCase();
    const match = words => words && words.some(word => lowerText.match(word.toLowerCase()));
    return match(this.props.searchKeywords.include) && !match(this.props.searchKeywords.exclude);
  }

  findSelectedItem = () => {
    let count = 0;
    for (let i = 0, l = this.props.selectedItem.instrumentIndex; i < l; i += 1) {
      count += this.props.data[i].conditions.length + 1;
    }

    return count + this.props.selectedItem.itemIndex + 1;
  };

  render() {
    const instrument = this.props.data[this.props.selectedItem.instrumentIndex];
    const index = this.props.selectedItem.itemIndex;
    const shouldRenderData = this.props.data.length > 0
      && instrument;

    const expanded = this.props.isExpandable && this.props.expanded;
    const items = this.getListData(this.props.data);

    return (
      <section className={classNames('ConditionDetails', { expanded })}>
        <div className={classNames('main', { expandable: this.props.isExpandable })}>
          <ProjectHeader
            isExpandable={this.props.isExpandable}
            expanded={this.props.expanded}
            selectedProject={this.props.selectedProject}
            toggleExpanded={this.props.toggleExpanded}
            browseBy={this.props.browseBy}
            openProjectDetails={this.props.openProjectDetails}
            counts={this.props.counts}
          />
          {!shouldRenderData ? null : (
            <>
              <div className="listPane">
                {items.length === 0 ? null : (
                  <ConditionList
                    items={items}
                    selectedItem={this.findSelectedItem()}
                    updateSelectedInstrument={this.props.updateSelectedInstrument}
                    updateSelectedCondition={this.props.updateSelectedCondition}
                  />
                )}
              </div>
              <div className="contentPane">
                <Content
                  instrument={instrument}
                  itemIndex={index}
                  openIntermediatePopup={this.props.openIntermediatePopup}
                  includedKeywords={this.props.searchKeywords.include}
                />
              </div>
            </>
          )}
        </div>
        <div className={classNames('popout', { expanded })}>
          {!shouldRenderData ? null : (
            <Details
              isInstrument={index === -1}
              data={index === -1 ? null : instrument.conditions[index].details}
            />
          )}
        </div>
      </section>
    );
  }
}

export default ConditionDetails;
