import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'lodash.memoize';
import memoizeReference from '../../../utilities/memoizeReference';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import List from '../../List';
import './styles.scss';

import { reportAnalytics } from '../../../utilities/analyticsReporting';

const offsetClasses = ['', 'oneAway', 'twoAway', 'threeAway'];
const indexOffsets = [-3, -2, -1, 0, 1, 2, 3];

const wrapIndex = (i, selected, length) => (selected + i + length) % length;

const memoizedListElements = memoize((listContent, selected) => {
  if (listContent.length === 0) { return []; }
  return indexOffsets.map((offset) => {
    const text = listContent[wrapIndex(offset, selected, listContent.length)].name;
    return (
      <span
        title={text}
        className={offsetClasses[Math.abs(offset)]}
        key={`${text}-${offset}`}
      >
        {text}
      </span>
    );
  });
}, (list, selected) => `${memoizeReference(list)}-${selected}`);

class WheelList extends React.PureComponent {
  static propTypes = {
    /** Additional classes to apply */
    className: PropTypes.string,
    /** Event handler, will receive the array index being selected */
    onChange: PropTypes.func.isRequired,
    /** Index of the currently selected item in 'listContent' */
    selected: PropTypes.number.isRequired,
    /** Wheel mode */
    wheelType: PropTypes.oneOf(['company', 'location']).isRequired,
    /** Array of company/location names to pull the list from */
    listContent: PropTypes.arrayOf(PropTypes.any).isRequired,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      listElements: [],
    };
  }

  static getDerivedStateFromProps(props) {
    return { listElements: memoizedListElements(props.listContent, props.selected) };
  }

  reportAnalytics = (item, e) => {
    const [type, name] = (this.props.wheelType === 'company')
      ? ['company', item.name]
      : ['region', `${item.name}, ${item.province}`];

    reportAnalytics(e.type, `select ${type} from wheel list`, name);
  }

  handleOnChange = (i, e) => {
    const wrappedIndex = wrapIndex(i - 3, this.props.selected, this.props.listContent.length);

    this.reportAnalytics(this.props.listContent[wrappedIndex], e);
    this.props.onChange(wrappedIndex);
  }

  render() {
    return (
      <div className={classNames('WheelList', this.props.className)}>
        <div className="labelContainer">
          <AdvancedFormattedMessage
            id={`components.companyWheel.list.${this.props.wheelType}`}
            className="label"
          />
          {(!this.props.listContent.length) ? null
            : (
              <span
                title={this.props.listContent[this.props.selected].name}
                className="selected"
              >
                {this.props.listContent[this.props.selected].name}
              </span>
            )}
        </div>
        <div className="listContainer">
          {(!this.props.listContent.length) ? null
            : (
              <div className="list">
                <List
                  elevated
                  items={this.state.listElements}
                  onChange={this.handleOnChange}
                  selected={3}
                />
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default WheelList;
