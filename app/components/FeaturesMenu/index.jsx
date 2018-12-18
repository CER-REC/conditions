import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';

// TODO: This is a mock, replace with the translation function
const t = searchList => searchList[2];

const getListMenu = (features, onChange) => (
  // TODO: Update List properties when the vertical feature is implemented
  <List
    items={features}
    selected={0}
    onChange={index => onChange(features[index])}
  />
);

const getDropDownMenu = (features, onChange) => {
  const options = features.map(feature => (
    <option key={feature} value={feature}>{feature}</option>
  ));

  return (
    <select onChange={event => onChange(event.target.value)}>
      {options}
    </select>
  );
};

const FeaturesMenu = (props) => {
  const features = props.features.map(feature => t(['featuresMenu', 'title', feature]));
  const { onChange, dropDown } = props;
  const menu = dropDown ? getDropDownMenu(features, onChange) : getListMenu(features, onChange);

  return (
    <div className={`FeaturesMenu ${dropDown ? 'dropDown' : ''} ${props.className}`}>
      <span className="title">{`${t(['featuresMenu', 'title', props.title])}`}</span>
      {menu}
    </div>
  );
};

FeaturesMenu.propTypes = {
  /** The title to be displayed */
  title: PropTypes.string.isRequired,
  /** The list of features to display in the menu */
  features: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  /** The flag to determine if the component renders in drop down mode */
  dropDown: PropTypes.bool,
  /** A function that will receive an feature when a new feature is selected */
  onChange: PropTypes.func.isRequired,
  /** Additional className to add to the component */
  className: PropTypes.string,
};

FeaturesMenu.defaultProps = {
  dropDown: false,
  className: '',
};

export default FeaturesMenu;
