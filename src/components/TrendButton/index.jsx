import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import StreamGraph from '../StreamGraph';
import { allConditionsPerYear, featureTypes } from '../../proptypes';

import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';

const TrendButton = props => (
  <div className="TrendButton" {...handleInteraction(props.onClick)}>
    <div className="buttonText">
      <StreamGraph
        countsData={props.countsData}
        feature={props.feature}
        subFeature={props.subFeature}
        streamOnly
      />
      <FormattedMessage id="components.trendButton.description">
        {text => (
          <span className="descriptionText">
            {text.split('\n').map(string => (
              <p key={string}>{string}</p>
            ))}
          </span>
        )}
      </FormattedMessage>
    </div>
  </div>
);

export default TrendButton;

TrendButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  countsData: allConditionsPerYear.isRequired,
  feature: featureTypes.isRequired,
  subFeature: PropTypes.string.isRequired,
};
