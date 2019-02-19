import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import List from '../../List';
import BarContainer from '../../BarContainer';

const getMarkerClass = (text, keywords) => {
  if (!keywords) return false;

  const lowerText = text.toLowerCase();

  const match = words => words && words.some(word => lowerText.match(word.toLowerCase()));
  return (match(keywords.include) && !match(keywords.exclude))
    ? 'marked'
    : 'unmarked';
};

class ConditionList extends React.Component {
  findSelectedItemIndex = () => {
    let count = 0;
    for (let i = 0, l = this.props.selectedItem.instrumentIndex; i < l; i += 1) {
      count += this.props.data[i].conditions.length + 1;
    }

    return count + this.props.selectedItem.itemIndex + 1;
  };

  render() {
    const onChange = (element) => {
      const { 'data-instrument-index': instrumentIndex, 'data-item-index': itemIndex } = element.props;
      this.props.updateSelectedItem(instrumentIndex, itemIndex);
    };

    const selected = this.findSelectedItemIndex();

    const elements = [];
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

      instrument.conditions.forEach((condition, conditionIndex) => {
        elements.push((
          <div
            key={`${instrumentIndex}-${conditionIndex}`}
            data-instrument-index={instrumentIndex}
            data-item-index={conditionIndex}
          >
            <div
              key="1"
              className={getMarkerClass(condition.text, this.props.searchKeywords)}
            />
            <BarContainer
              items={[{
                value: condition.length,
                fill: condition.fill,
              }]}
              size="6"
              maxValue="25"
              key="2"
            />
          </div>
        ));
      });
    });

    return (
      <div className="ConditionList">
        <List
          items={elements}
          onChange={i => onChange(elements[i])}
          selected={selected}
        />
      </div>
    );
  }
}

ConditionList.propTypes = {
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
  updateSelectedItem: PropTypes.func.isRequired,
};

ConditionList.defaultProps = {
  searchKeywords: { include: [], exclude: [] },
  selectedItem: { instrumentIndex: 0, itemIndex: -1 },
};

export default ConditionList;
