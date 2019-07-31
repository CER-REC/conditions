import React from 'react';
import PropTypes from 'prop-types';
import AdvancedFormattedMessage from '../AdvancedFormattedMessage';
import TranslatedParagraphs from '../TranslatedParagraphs';
import StreamGraph from '../StreamGraph';
import { allConditionsPerYearType, featureTypes, displayOrder } from '../../proptypes';

import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';

const TrendButton = props => (
  <div className="TrendButton" {...handleInteraction(props.onClick)}>
    <div className="buttonText">
      <StreamGraph
        allConditionsPerYear={props.allConditionsPerYear}
        displayOrder={props.displayOrder}
        feature={props.feature}
        subFeature=""
        streamOnly
      />
      <span className="descriptionText">
        <AdvancedFormattedMessage
          id="components.trendButton.description"
          tag={TranslatedParagraphs}
        />
      </span>
    </div>
  </div>
);

TrendButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  allConditionsPerYear: allConditionsPerYearType.isRequired,
  feature: featureTypes.isRequired,
  displayOrder: displayOrder.isRequired,
};

export default React.memo(TrendButton);
