import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AdvancedFormattedMessage from '../AdvancedFormattedMessage';
import List from '../List';
import './styles.scss';
import Dropdown from '../Dropdown';
import { features as featuresRaw } from '../../constants';

const features = Object.keys(featuresRaw);
const FeaturesMenu = (props) => {
  const id = props.dropDown ? 'components.featureMenu.dropDownTitle' : 'common.trend.title';
  const selected = features.includes(props.selected) ? props.selected : features[0];
  const listItems = features.map(feature => (
    <AdvancedFormattedMessage key={feature} id={`common.features.${feature}`} />
  ));

  return (
    <div className={classNames('FeaturesMenu', props.className, { dropDown: props.dropDown })}>
      <AdvancedFormattedMessage id={id} className="title" />
      {(props.dropDown) ? (
        <Dropdown
          options={features}
          onChange={props.onChange}
          selectedOption={selected}
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

export default React.memo(FeaturesMenu);
