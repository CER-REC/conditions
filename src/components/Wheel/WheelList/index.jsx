import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import List from '../../List';
import './styles.scss';

const offsetClasses = ['', 'oneAway', 'twoAway', 'threeAway'];
const indexOffsets = [-3, -2, -1, 0, 1, 2, 3];

const WheelList = (props) => {
  const wrapIndex = i => (
    (props.selected + i + props.listContent.length)
    % props.listContent.length
  );
  const handleOnChange = i => props.onChange(wrapIndex(i - 3));

  const listElements = indexOffsets.map((offset) => {
    const text = props.listContent[wrapIndex(offset)].company_name;
    return (
      <span
        className={offsetClasses[Math.abs(offset)]}
        // eslint-disable-next-line react/no-array-index-key
        key={`${text}-${offset}`}
      >
        {text}
      </span>
    );
  });

  return (
    <div
      className={classNames('WheelList', props.className)}
    >
      <div className="labelContainer">
        <FormattedMessage id={`components.companyWheel.list.${props.wheelType}`}>
          {text => <span className="label">{text}</span>}
        </FormattedMessage>
        <span className="selected" style={{ width: props.textClippingRadius }}>
          {props.listContent[props.selected].company_name}
        </span>
      </div>
      <div className="listContainer">
        <div className="list">
          <List
            elevated
            items={listElements}
            onChange={handleOnChange}
            selected={3}
          />
        </div>
      </div>
    </div>
  );
};

WheelList.propTypes = {
  /** Distance at which to clip the selected text. Requires a valid CSS width. */
  textClippingRadius: PropTypes.string,
  /** Additional classes to apply */
  className: PropTypes.string,
  /** Event handler, will receive the array index being selected */
  onChange: PropTypes.func.isRequired,
  /** Index of the currently selected item in 'listContent' */
  selected: PropTypes.number.isRequired,
  /** Wheel mode */
  wheelType: PropTypes.oneOf(['company', 'location']).isRequired,
  /** Array of company/location names to pull the list from */
  listContent: PropTypes.arrayOf(PropTypes.node).isRequired,
};

WheelList.defaultProps = {
  className: null,
  textClippingRadius: '50%',
};

export default WheelList;
