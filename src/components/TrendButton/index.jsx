import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import StreamGraph from '../StreamGraph';
import { allConditionsPerYear, featureTypes } from '../../proptypes';
import InstrumentBubble from '../BubbleChart/InstrumentBubble';

import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';

const noop = () => {};

const TrendButton = props => (
  <div className="TrendButton" {...handleInteraction(props.onClick)}>
    <div className="buttonText">
      { props.feature === 'instrument'
        ? (
          <svg className="instrumentSvg" width={120} height={50}>
            <InstrumentBubble
              onClick={noop}
              keyPress={noop}
              d3Calculation={props.instrumentData}
            />
          </svg>
        )
        : (
          <StreamGraph
            projectData={props.projectData}
            feature={props.feature}
            subFeature={props.subFeature}
          />
        )}
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
  instrumentData: PropTypes.instanceOf(Object).isRequired,
};
