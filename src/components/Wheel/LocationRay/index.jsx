import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { displayOrder, featureTypes, aggregatedFeatureData } from '../../../proptypes';
import BarContainer from '../../BarContainer';
import getKeyedAggregatedCount from '../../../utilities/getKeyedAggregatedCount';
import getFeatureColor from '../../../utilities/getFeatureColor';

const LocationRay = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { height, width, searched, adjustRotationReference, selectedFeature } = props;
  const counts = getKeyedAggregatedCount(props.items, selectedFeature);
  const items = props.displayOrder[selectedFeature]
    .reduce((acc, next, i) => acc.concat({
      feature: selectedFeature,
      description: next,
      value: counts[next] || 0,
      fill: getFeatureColor(selectedFeature, next, i),
    }), []);
  return (
    <g className="LocationRay">
      <BarContainer
        className="WheelBar"
        transform="translate(31)"
        width={width}
        height={height}
        items={items}
        vertical
        standalone
      />
      {searched ? (
        <line
          className="searched"
          y2="28%"
          y1="23.4%"
          style={{ transform: `rotate(-${90 - adjustRotationReference}deg)` }}
        />
      ) : null}
    </g>
  );
};

LocationRay.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  items: aggregatedFeatureData,
  searched: PropTypes.bool.isRequired,
  adjustRotationReference: PropTypes.number.isRequired,
  displayOrder: displayOrder.isRequired,
  selectedFeature: featureTypes.isRequired,
};

LocationRay.defaultProps = {
  items: null,
};

export default LocationRay;
