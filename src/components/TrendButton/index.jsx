import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import StreamGraph from '../StreamGraph';
import { allConditionsPerYear, featureTypes, allConditionsByCommodityOrInstrument } from '../../proptypes';

import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';

const noop = () => {};

const TrendButton = props => (
  <div className="TrendButton" {...handleInteraction(props.onClick)}>
    <div className="buttonText">
      <StreamGraph
        projectData={props.projectData}
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
      <svg className="trendArrow" width={10} viewBox="0 0 427.5 427.5">
        <path
          fill="#D1057A"
          d="M60.9,0l338.1,170.6v85.3L60.9,427.5l-32.5-68l295.5-146.2L28.4,69.1L60.9,0z"
        />
      </svg>
    </div>
  </div>
);

export default TrendButton;

TrendButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  projectData: allConditionsPerYear.isRequired,
  feature: featureTypes.isRequired,
  subFeature: PropTypes.string.isRequired,
  instrumentData: allConditionsByCommodityOrInstrument.isRequired,
};
