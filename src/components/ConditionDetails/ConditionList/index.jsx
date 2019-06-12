import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

import List from '../../List';
import BarContainer from '../../BarContainer';

class ConditionList extends React.PureComponent {
  onChange = (i) => {
    const { instrumentNumber, id } = this.props.items[i];
    console.log({ instrumentIndex: instrumentNumber, itemIndex: id });
    this.props.updateSelectedItem({ instrumentIndex: instrumentNumber, itemIndex: id });
  }

  render() {
    const elements = this.props.items.reduce((out, item) => {
      out.push((item.isInstrument)
        ? (
          <div key={item.instrumentNumber}>
            <div className={classNames('barMarker', { marked: item.marked })} />
            <h4>{item.instrumentNumber}</h4>
          </div>
        )
        : (
          <div key={`${item.instrumentIndex}-${item.itemIndex}`}>
            <div className={classNames('barMarker', { marked: item.marked })} />

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
          onChange={this.onChange}
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
