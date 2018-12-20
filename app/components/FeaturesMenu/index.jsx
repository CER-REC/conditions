import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import './styles.scss';

// TODO: This is a mock, replace with the translation function
const t = searchList => searchList[2];

const FeaturesMenu = (props) => {
  let menu;
  const features = props.features.map(feature => t(['featuresMenu', 'title', feature]));
  const selected = features.includes(props.selected) ? props.selected : features[0];
  const { onChange, dropDown } = props;

  if (dropDown) {
    const options = features.map(feature => (
      <option key={feature} value={feature}>{feature}</option>
    ));

    menu = (
      <select value={selected} onChange={event => onChange(event.target.value)}>
        {options}
      </select>
    );
  } else {
    // TODO: Update List properties when the vertical feature is implemented
    menu = (
      <List
        items={features}
        selected={features.indexOf(selected)}
        onChange={index => onChange(features[index])}
      />
    );
  }

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
