import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import List from '../List';
import './styles.scss';
import Dropdown from '../Dropdown';
import { features as featuresRaw } from '../../constants';

const features = Object.keys(featuresRaw);

const FeaturesMenu = (props) => {
  const id = props.dropDown ? 'components.featureMenu.dropDownTitle' : 'common.trend.title';
  const selected = features.includes(props.selected) ? props.selected : features[0];
  const listItems = features.map(feature => (
    <FormattedMessage key={feature} id={`common.features.${feature}`} />
  ));

  return (
    <div className={classNames('FeaturesMenu', props.className, { dropDown: props.dropDown })}>
      <FormattedMessage id={id}>{text => <span className="title">{text}</span>}</FormattedMessage>
      {(props.dropDown) ? (
        <Dropdown
          options={features}
          onChange={props.onChange}
          selectedOption={props.selected}
          optionID="common.features"
        />
      ) : (
        <List
          items={listItems}
          selected={features.indexOf(selected)}
          onChange={index => props.onChange(features[index])}
          guideLine
        />
      )}
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
