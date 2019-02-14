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

class ConditionDetails extends React.Component {
  renderHeader = () => (
    <React.Fragment>
      <FormattedMessage id="components.conditionDetails.selectedProject" tagName="h1" />
      <h2>{this.props.selectedProject}</h2>
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

  renderConditionBars = (conditions, itemIdx) => conditions.reduce(
    (out, condition, idx) => {
      out.push(
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`${itemIdx}-${idx}`}>
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
            key={idx.toString()}
          />
        </React.Fragment>,
      );
      return out;
    }, [],
  )

  renderList = () => {
    const elements = this.props.data.reduce((out, instrument, idx) => {
      const instrumentHeading = (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={instrument.instrumentNumber}>
          <div className="unmarked" />
          <h4>{instrument.instrumentNumber}</h4>
        </React.Fragment>
      );

      const conditions = this.renderConditionBars(instrument.conditions, idx);

      out.push(instrumentHeading, ...conditions);

      return out;
    }, []);

    return (
      <List
        items={elements}
        onChange={handleInteraction}
        selected={this.props.selectedItem}
      />
    );
  }

  renderContentBlock = (id, content, isHalf) => (
    <div className={`contentBlock ${(isHalf ? 'half' : '')}`}>
      <FormattedMessage id={id} tagName="h4" />: {content}
    </div>
  )

  renderInstrument = data => (
    <React.Fragment>
      {this.renderContentBlock('components.conditionDetails.issuanceDate', data.issuanceDate, true)}
      {this.renderContentBlock('components.conditionDetails.instrumentNumber', data.instrumentNumber, true)}
      {this.renderContentBlock('components.conditionDetails.effectiveDate', data.effectiveDate, true)}
      {this.renderContentBlock('components.conditionDetails.status', data.status, true)}
      {this.renderContentBlock('components.conditionDetails.sunsetDate', data.sunsetDate, true)}
      {this.renderContentBlock('components.conditionDetails.location', data.location, true)}
      {this.renderContentBlock('components.conditionDetails.type', data.type)}
      {this.renderContentBlock('components.conditionDetails.activity', data.activity)}
    </React.Fragment>
  )

  renderCondition = (condition, data) => (
    <React.Fragment>
      {this.renderContentBlock('components.conditionDetails.effectiveDate', data.effectiveDate, true)}
      {this.renderContentBlock('components.conditionDetails.instrumentNumber', data.instrumentNumber, true)}
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

    return (
      <section className="ConditionDetails">
        <div className="gridCell header">{this.renderHeader()}</div>
        <div className="gridCell list">{this.renderList()}</div>
        <div className="gridCell blank" />
        <div className="gridCell content">{this.renderContent(instrument, index)}</div>
        <div className="gridCell details">{this.renderDetails(instrument, index)}</div>
      </section>
    );
  }
}

ConditionDetails.propTypes = {
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
};

ConditionDetails.defaultProps = {
  expanded: true,
  searchKeywords: { include: [], exclude: [] },
  selectedItem: { instrumentIndex: 0, itemIndex: -1 },
};

export default ConditionDetails;
