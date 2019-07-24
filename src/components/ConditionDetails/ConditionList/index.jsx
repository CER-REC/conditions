import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

import List from '../../List';
import BarContainer from '../../BarContainer';

class ConditionList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  scrollTo = (type) => {
    if (!this.ref.current) { return; }
    const node = this.ref.current;
    if (!node || node.scrollHeight <= node.clientHeight) { return; }

    const elm = node.querySelector(`[data-heading="${type}"]`);
    elm.scrollIntoView({ block: 'center' });
  }

  onChange = (i) => {
    const { conditionId, instrumentId, instrumentIndex, itemIndex } = this.props.items[i];
    if (conditionId) {
      this.props.updateSelectedCondition(conditionId);
    } else {
      this.props.updateSelectedInstrument(instrumentId);
    }
    this.scrollTo(`${instrumentIndex}-${itemIndex}`);
  }

  render() {
    const elements = this.props.items.reduce((out, item) => {
      out.push((item.isInstrument)
        ? (
          <div
            key={item.instrumentNumber}
            title={item.instrumentNumber}
            data-heading={`${item.instrumentIndex}-${item.itemIndex}`}
          >
            <div className={classNames('barMarker', { marked: item.marked })} />
            <h4>{item.instrumentNumber}</h4>
          </div>
        )
        : (
          <div key={`${item.instrumentIndex}-${item.itemIndex}`} data-heading={`${item.instrumentIndex}-${item.itemIndex}`}>
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
      <div className="ConditionList" ref={this.ref}>
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
    instrumentId: PropTypes.number.isRequired,
    conditionId: PropTypes.number,
    instrumentIndex: PropTypes.number.isRequired,
    itemIndex: PropTypes.number.isRequired,
    binnedValue: PropTypes.number,
    fill: PropTypes.arrayOf(PropTypes.string),
    marked: PropTypes.bool,
  })).isRequired,
  selectedItem: PropTypes.number,
  updateSelectedInstrument: PropTypes.func.isRequired,
  updateSelectedCondition: PropTypes.func.isRequired,
};

ConditionList.defaultProps = {
  selectedItem: 0,
};

export default ConditionList;
