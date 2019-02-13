import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import List from '../List';
import BarContainer from '../BarContainer';

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
    return <React.Fragment><h2>Selected Project:</h2> <h1>{this.props.selectedProject}</h1></React.Fragment>;
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
          <h4>{instrument.instrumentNumber}</h4>
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
        <div className="contentBlock half"><h4>Issuance Date:</h4> {data.issuanceDate}</div>
        <div className="contentBlock half"><h4>Instrument #:</h4> {data.instrumentNumber}</div>
        <div className="contentBlock half"><h4>Effective Date:</h4> {data.effectiveDate}</div>
        <div className="contentBlock half"><h4>Instrument Status:</h4> {data.status}</div>
        <div className="contentBlock half"><h4>Sunset Date:</h4> {data.sunsetDate}</div>
        <div className="contentBlock half"><h4>Location:</h4> {data.location}</div>
        <div className="contentBlock"><h4>Instrument Type:</h4> {data.type}</div>
        <div className="contentBlock"><h4>Instrument Activity:</h4> {data.activity}</div>
      </React.Fragment>
    );
  }

  renderCondition(condition, data) {
    return (
      <React.Fragment>
        <div className="contentBlock half"><h4>Effective Date:</h4> {data.effectiveDate}</div>
        <div className="contentBlock half"><h4>Instrument #:</h4> {data.instrumentNumber}</div>
        <div className="contentBlock"><h4>Keyword(s):</h4> {condition.keywords.join(', ')}</div>
        <div className="contentBlock"><h4>Text:</h4> {condition.text}</div>
      </React.Fragment>
    );
  }

  renderContent(instrument, index) {
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
          <div className="contentBlock"><h4>Theme:</h4> {details.theme}</div>
          <div className="contentBlock"><h4>Instrument:</h4> {details.instrument}</div>
          <div className="contentBlock"><h4>Phase:</h4> {details.phase}</div>
          <div className="contentBlock"><h4>Type:</h4> {details.type}</div>
          <div className="contentBlock"><h4>Status:</h4> {details.status}</div>
          <div className="contentBlock"><h4>Filing:</h4> {details.filing}</div>
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
