import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import List from '../../List';
import BarContainer from '../../BarContainer';

class ConditionList extends React.Component {
  render() {
    const onChange = (element) => {
      const { 'data-instrument-index': instrumentIndex, 'data-item-index': itemIndex } = element.props;
      this.props.updateSelectedItem(instrumentIndex, itemIndex);
    };

    const elements = this.props.items.reduce((out, item) => {
      out.push((item.isInstrument)
        ? (
          <div
            key={item.instrumentNumber}
            data-instrument-index={item.instrumentIndex}
            data-item-index={item.itemIndex}
          >
            <div className="unmarked" />
            <h4>{item.instrumentNumber}</h4>
          </div>
        )
        : (
          <div
            key={`${item.instrumentIndex}-${item.itemIndex}`}
            data-instrument-index={item.instrumentIndex}
            data-item-index={item.itemIndex}
          >
            <div className={item.marked ? 'marked' : 'unmarked'} />
            <BarContainer
              className={`binnedValue-${item.binnedValue}`}
              items={
                item.fill.map(color => ({
                  value: 1,
                  fill: color,
                }))
              }
            />
          </div>
        ));

      return out;
    }, []);

    return (
      <div className="ConditionList">
        <List
          items={elements}
          onChange={i => onChange(elements[i])}
          selected={this.props.selectedItem}
        />
      </div>
    );
  }
}

ConditionList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    isInstrument: PropTypes.bool,
    instrumentNumber: PropTypes.string,
    instrumentIndex: PropTypes.number.isRequired,
    itemIndex: PropTypes.number.isRequired,
    binnedValue: PropTypes.number,
    fill: PropTypes.arrayOf(PropTypes.string),
    marked: PropTypes.bool,
  })).isRequired,
  selectedItem: PropTypes.number,
  updateSelectedItem: PropTypes.func.isRequired,
};

ConditionList.defaultProps = {
  selectedItem: 0,
};

export default ConditionList;
