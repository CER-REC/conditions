import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

import List from '../../List';
import BarContainer from '../../BarContainer';

class ConditionList extends React.PureComponent {
  itemRefs = {};

  scrollBy = (refId) => {
    this.itemRefs[refId].scrollIntoView({ block: 'center' });
  }

  onChange = (i) => {
    const { instrumentNumber, id, instrumentIndex, itemIndex } = this.props.items[i];
    this.props.updateSelectedItem({ instrumentNumber, id, instrumentIndex, itemIndex });
    this.scrollBy(`${instrumentIndex}-${itemIndex}`);
  }

  render() {
    const elements = this.props.items.reduce((out, item) => {
      out.push((item.isInstrument)
        ? (
          // eslint-disable-next-line no-return-assign
          <div key={item.instrumentNumber} ref={el => (this.itemRefs[`${item.instrumentIndex}-${item.itemIndex}`] = el)}>
            <div className={classNames('barMarker', { marked: item.marked })} />
            <h4>{item.instrumentNumber}</h4>
          </div>
        )
        : (
          // eslint-disable-next-line no-return-assign
          <div key={`${item.instrumentIndex}-${item.itemIndex}`} ref={el => (this.itemRefs[`${item.instrumentIndex}-${item.itemIndex}`] = el)}>
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
    id: PropTypes.number,
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
