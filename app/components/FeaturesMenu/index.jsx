import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import List from '../List';
import './styles.scss';

const FeaturesMenu = (props) => {
  let menu;
  const id = props.dropDown ? 'components.featureMenu.dropDownTitle' : 'common.trend.title';
  const selected = props.features.includes(props.selected) ? props.selected : props.features[0];
  const listItems = props.features.map(feature => (
    <FormattedMessage key={feature} id={`common.features.${feature}`} />
  ));

  if (props.dropDown) {
    const options = props.features.map(feature => (
      <FormattedMessage key={feature} id={`common.features.${feature}`}>
        {text => (
          <option value={feature}>
            {text}
          </option>
        )}
      </FormattedMessage>
    ));

    menu = (
      <select value={selected} onChange={event => props.onChange(event.target.value)}>
        {options}
      </select>
    );
  } else {
    menu = (
      <List
        items={listItems}
        selected={props.features.indexOf(selected)}
        onChange={index => props.onChange(props.features[index])}
        guideLine
      />
    );
  }

  return (
    <div className={classNames('FeaturesMenu', props.className, { dropDown: props.dropDown })}>
      <FormattedMessage id={id}>
        {text => (<span className="title">{text}</span>)}
      </FormattedMessage>
      {menu}
    </div>
  );
};

FeaturesMenu.propTypes = {
  /** The list of features to display in the menu */
  features: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  /** The currently selected feature */
  selected: PropTypes.string,
  /** The flag to determine if the component renders in drop down mode */
  dropDown: PropTypes.bool,
  /** A function that will receive an feature when a new feature is selected */
  onChange: PropTypes.func.isRequired,
  /** Additional className to add to the component */
  className: PropTypes.string,
};

FeaturesMenu.defaultProps = {
  selected: '',
  dropDown: false,
  className: '',
};

export default FeaturesMenu;
