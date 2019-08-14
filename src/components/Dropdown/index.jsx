import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AdvancedFormattedMessage from '../AdvancedFormattedMessage';
import './styles.scss';

const Dropdown = (props) => {
  const selected = props.options.includes(props.selectedOption)
    ? props.selectedOption
    : props.options[0];
  const selectList = props.options.map(feature => (
    <AdvancedFormattedMessage
      key={feature}
      id={`${props.optionID}.${feature}`}
      tag="option"
      value={feature}
    />
  ));

  return (
    <div className={classNames('Dropdown', props.className)}>
      <select value={selected} onChange={event => props.onChange(event.target.value)}>
        {selectList}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  /** The list of options to display in the menu */
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  /** String for list of formattedMessage */
  optionID: PropTypes.string.isRequired,
  /** String for selected option */
  selectedOption: PropTypes.string,
  /** A function that will select a different option */
  onChange: PropTypes.func.isRequired,
  /** Additional className */
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  selectedOption: '',
  className: '',
};

export default React.memo(Dropdown);
