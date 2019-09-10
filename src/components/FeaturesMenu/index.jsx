import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AdvancedFormattedMessage from '../AdvancedFormattedMessage';
import List from '../List';
import './styles.scss';
import Dropdown from '../Dropdown';
import { reportAnalytics } from '../../utilities/analyticsReporting';
import { features as featuresRaw } from '../../constants';

const features = Object.keys(featuresRaw);

const listItems = features.map(feature => (
  <AdvancedFormattedMessage key={feature} id={`common.features.${feature}`} />
));

class FeaturesMenu extends React.PureComponent {
  static propTypes = {
    /** The currently selected feature */
    selected: PropTypes.string,
    /** The flag to determine if the component renders in drop down mode */
    dropDown: PropTypes.bool,
    /** A function that will receive an feature when a new feature is selected */
    onChange: PropTypes.func.isRequired,
    /** Additional className to add to the component */
    className: PropTypes.string,
  };

  static defaultProps = {
    selected: '',
    dropDown: false,
    className: '',
  };

  onChange = (feature, e) => {
    reportAnalytics(e.type, 'select feature', feature);
    this.props.onChange(feature);
  }

  onListChange = (index, e) => {
    this.onChange(features[index], e);
  }

  render() {
    const id = this.props.dropDown ? 'components.featureMenu.dropDownTitle' : 'common.trend.title';
    const selected = features.includes(this.props.selected) ? this.props.selected : features[0];

    return (
      <div className={classNames('FeaturesMenu', this.props.className, { dropDown: this.props.dropDown })}>
        <AdvancedFormattedMessage id={id} className="title" />
        {(this.props.dropDown) ? (
          <Dropdown
            options={features}
            onChange={this.onChange}
            selectedOption={selected}
            optionID="common.features"
          />
        ) : (
          <List
            items={listItems}
            selected={features.indexOf(selected)}
            onChange={this.onListChange}
            guideLine
          />
        )}
      </div>
    );
  }
}

export default FeaturesMenu;
