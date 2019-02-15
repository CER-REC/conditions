import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import handleInteraction from '../../utilities/handleInteraction';

import './styles.scss';

import List from '../List';
import BarContainer from '../BarContainer';

const searchMatch = (text, include, exclude) => (
  (include && include.some(word => text.match(word)))
  && !(exclude && exclude.find(word => text.match(word)))
);

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

class ConditionDetails extends React.Component {
  renderHeader = () => (
    <React.Fragment>
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
    </React.Fragment>
  )

  renderListMarker = (condition) => {
    const markerClass = (
      this.props.searchKeywords
      && searchMatch(
        condition.text,
        this.props.searchKeywords.include,
        this.props.searchKeywords.exclude,
      )
    ) ? 'marked'
      : 'unmarked';

    return <div className={markerClass} />;
  }

  renderList = () => {
    let count = 0;
    let selected;
    const elements = [];

    const onChange = (element) => {
      const { 'data-instrument-index': instrumentIndex, 'data-item-index': itemIndex } = element.props;
      this.props.updateSelectedItem(instrumentIndex, itemIndex);
    };

    this.props.data.forEach((instrument, instrumentIndex) => {
      elements.push((
        <div
          key={instrument.instrumentNumber}
          data-instrument-index={instrumentIndex}
          data-item-index={-1}
        >
          <div className="unmarked" />
          <h4>{instrument.instrumentNumber}</h4>
        </div>
      ));

      if (!selected
        && this.props.selectedItem.instrumentIndex === instrumentIndex
        && this.props.selectedItem.itemIndex === -1
      ) {
        selected = count;
      } else {
        count += 1;
      }

      instrument.conditions.forEach((condition, conditionIndex) => {
        elements.push(
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${instrumentIndex}-${conditionIndex}`}
            data-instrument-index={instrumentIndex}
            data-item-index={conditionIndex}
          >
            {this.renderListMarker(condition)}
            <BarContainer
              items={
                [
                  {
                    value: condition.length,
                    fill: condition.fill,
                  },
                ]
              }
              size="6"
              maxValue="25"
              // eslint-disable-next-line react/no-array-index-key
              key={conditionIndex}

            />
          </div>,
        );

        if (!selected
          && this.props.selectedItem.instrumentIndex === instrumentIndex
          && this.props.selectedItem.itemIndex === conditionIndex
        ) {
          selected = count;
        } else {
          count += 1;
        }
      });
    });

    return (
      <List
        items={elements}
        onChange={i => onChange(elements[i])}
        selected={selected}
      />
    );
  }

  renderContentBlock = (id, content, isHalf) => (
    <div className={`contentBlock ${(isHalf ? 'half' : '')}`}>
      <FormattedMessage id={id} tagName="h4" />: {content}
    </div>
  )

  renderInstrumentLink = instrumentNumber => (
    <button
      type="button"
      className="instrumentLink"
      {...handleInteraction(this.props.openIntermediatePopup, instrumentNumber)}
    >
      {instrumentNumber}
    </button>
  )

  renderInstrument = data => (
    <React.Fragment>
      {this.renderContentBlock('components.conditionDetails.issuanceDate', data.issuanceDate, true)}
      {this.renderContentBlock('components.conditionDetails.instrumentNumber', this.renderInstrumentLink(data.instrumentNumber), true)}
      {this.renderContentBlock('components.conditionDetails.effectiveDate', data.effectiveDate, true)}
      {this.renderContentBlock('components.conditionDetails.status', <FormattedMessage id={`common.${data.status}`} />, true)}
      {this.renderContentBlock('components.conditionDetails.sunsetDate', data.sunsetDate, true)}
      {this.renderContentBlock('components.conditionDetails.location', data.location, true)}
      {this.renderContentBlock('components.conditionDetails.type', data.type)}
      {this.renderContentBlock('components.conditionDetails.activity', data.activity)}
    </React.Fragment>
  )

  renderCondition = (condition, data) => (
    <React.Fragment>
      {this.renderContentBlock('components.conditionDetails.effectiveDate', data.effectiveDate, true)}
      {this.renderContentBlock('components.conditionDetails.instrumentNumber', this.renderInstrumentLink(data.instrumentNumber), true)}
      {this.renderContentBlock('components.conditionDetails.keywords', condition.keywords.join(', '))}
      {this.renderContentBlock('components.conditionDetails.text', condition.text)}
    </React.Fragment>
  )

  renderContent = (instrument, index) => ((index === -1)
    ? this.renderInstrument(instrument)
    : this.renderCondition(instrument.conditions[index], instrument)
  )

  renderDetails = (instrument, index) => {
    if (index === -1) return null;

    const { details } = instrument.conditions[index];
    return (
      <React.Fragment>
        <FormattedMessage id="components.conditionDetails.selectedConditionFeature" tagName="h3" />
        {this.renderContentBlock('common.features.theme', <FormattedMessage id={`common.${details.theme}`} />)}
        {this.renderContentBlock('common.features.instrument', <FormattedMessage id={`common.${details.instrument}`} />)}
        {this.renderContentBlock('common.features.phase', <FormattedMessage id={`common.${details.phase}`} />)}
        {this.renderContentBlock('common.features.type', <FormattedMessage id={`common.${details.type}`} />)}
        {this.renderContentBlock('common.features.status', <FormattedMessage id={`common.${details.status}`} />)}
        {this.renderContentBlock('common.features.filing', <FormattedMessage id={`common.${details.filing}`} />)}
      </React.Fragment>
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
  toggleExpand: PropTypes.func.isRequired,
  updateSelectedItem: PropTypes.func.isRequired,
};

ConditionDetails.defaultProps = {
  isExpandable: false,
  expanded: false,
  searchKeywords: { include: [], exclude: [] },
  selectedItem: { instrumentIndex: 0, itemIndex: -1 },
};

export default ConditionDetails;
