import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import TextDetails from './TextDetails';
import List from '../List';
import BarContainer from '../BarContainer';
import SelectedGroupBar from '../SelectedGroupBar';

const searchMatch = (text, include, exclude) => (
  (include && include.some(word => text.match(word)))
  && !(exclude && exclude.find(word => text.match(word)))
);

class ConditionDetails extends React.Component {
  renderHeader() {
    // const props = {
    //   group: 'components.conditionDetails.selectedProject',
    //   backgroundColor: 'lightgray',
    //   children: [this.props.selectedProject],
    // };
    // return <SelectedGroupBar {...props} />;
    return <p>Selected Project: {this.props.selectedProject}</p>;
  }

  renderTab(condition) {
    const tabClass = (
      this.props.searchKeywords
      && searchMatch(
        condition.text,
        this.props.searchKeywords.include,
        this.props.searchKeywords.exclude,
      )
    ) ? 'marked'
      : 'unmarked';

    return <div className={tabClass} />;
  }

  renderConditionBars(conditions, itemIdx) {
    return conditions.reduce((out, condition, idx) => {
      out.push(
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`${itemIdx}-${idx}`}>
          {this.renderTab(condition)}
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
    }, []);
  }

  renderList() {
    const elements = [];
    this.props.data.forEach((instrument, idx) => {
      const instrumentHeading = (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={instrument.instrumentNumber}>
          <div className="unmarked" />
          <span>{instrument.instrumentNumber}</span>
        </React.Fragment>
      );

      const conditions = this.renderConditionBars(instrument.conditions, idx);

      elements.push(instrumentHeading, ...conditions);
    });

    return (
      <List
        items={elements}
        onChange={handleInteraction}
        selected={this.props.selectedItem}
      />
    );
  }

  renderInstrument(data) {
    return (
      <React.Fragment>
        <div className="contentHalf">Issuance Date: {data.issuanceDate}</div>
        <div className="contentHalf">Instrument #: {data.instrumentNumber}</div>
        <div className="contentHalf">Effective Date: {data.effectiveDate}</div>
        <div className="contentHalf">Instrument Status: {data.status}</div>
        <div className="contentHalf">Sunset Date: {data.sunsetDate}</div>
        <div className="contentHalf">Location: {data.location}</div>
        <div>Instrument Type: {data.type}</div>
        <div>Instrument Activity: {data.activity}</div>
      </React.Fragment>
    );
  }

  renderCondition(condition, data) {
    return (
      <React.Fragment>
        <div className="contentHalf">Effective Date: {data.effectiveDate}</div>
        <div className="contentHalf">Instrument #: {data.instrumentNumber}</div>
        <div>Keyword(s): {condition.keywords.join(', ')}</div>
        <div>Text: {condition.text}</div>
      </React.Fragment>
    );
  }

  renderItem(instrument, index) {
    return (index === -1)
      ? this.renderInstrument(instrument)
      : this.renderCondition(instrument.conditions[index], instrument);
  }

  renderItemDetails(instrument, index) {
    if (index === -1) return null;

    const details = instrument.conditions[index].details;
    return (
        <React.Fragment>
          <h3>Selected Condition Feature</h3>
          <div>Theme: {details.theme}</div>
          <div>Instrument: {details.instrument}</div>
          <div>Phase: {details.phase}</div>
          <div>Type: {details.type}</div>
          <div>Status: {details.status}</div>
          <div>Filing: {details.filing}</div>
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
        <div className="gridCell content">{this.renderItem(instrument, index)}</div>
        <div className="gridCell details">{this.renderItemDetails(instrument, index)}</div>
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
