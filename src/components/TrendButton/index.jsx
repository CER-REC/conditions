import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import StreamGraph from '../StreamGraph';
import { allConditionsPerYear, featureTypes, allConditionsByCommodityOrInstrument } from '../../proptypes';
import BubbleChart from '../BubbleChart';

import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';

const noop = () => {};

const TrendButton = props => (
  <div className="TrendButton" {...handleInteraction(props.onClick)}>
    <div className="buttonText">
      { props.feature === 'instrument'
        ? (
          <div style={{ width: '120px', height: '50px' }}>
            <BubbleChart
              setIndicator={noop}
              indicator=""
              data={props.instrumentData}
              type=""
            />
          </div>
        )
        : (
          <StreamGraph
            projectData={props.projectData}
            feature={props.feature}
            subFeature={props.subFeature}
            streamOnly
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
