import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

import List from '../../List';
import BarContainer from '../../BarContainer';

class ConditionList extends React.PureComponent {
  static propTypes = {
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

  static defaultProps = {
    selectedItem: 0,
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const item = this.props.items[this.props.selectedItem];
    this.scrollTo(item.instrumentIndex, item.itemIndex);
  }

  componentDidUpdate(prevProps) {
    const prev = prevProps.selectedItem;
    const cur = this.props.selectedItem;

    if (cur !== prev) {
      const item = this.props.items[cur];
      this.scrollTo(item.instrumentIndex, item.itemIndex);
    }
  }

  scrollTo = (instrumentIndex, itemIndex) => {
    if (!this.ref.current) { return; }

    const node = this.ref.current;
    if (!node) { return; }

    const list = node.querySelector('.List');
    if (list.scrollHeight <= list.clientHeight) { return; }

    const scrollSelector = `[data-heading="${instrumentIndex}-${itemIndex}"]`;

    const elm = list.querySelector(scrollSelector);
    const elmRect = elm.getBoundingClientRect();

    const listRect = list.getBoundingClientRect();

    const elmTop = elmRect.top + list.scrollTop;
    const listTop = listRect.top;

    list.scrollTop = (elmTop - listTop) - ((listRect.height - elmRect.height) / 2);
  }

  onChange = (i) => {
    const { conditionId, instrumentId } = this.props.items[i];
    if (conditionId) {
      this.props.updateSelectedCondition(conditionId);
    } else {
      this.props.updateSelectedInstrument(instrumentId);
    }
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
          <div
            key={`${item.instrumentIndex}-${item.itemIndex}`}
            data-heading={`${item.instrumentIndex}-${item.itemIndex}`}
          >
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

export default ConditionList;
