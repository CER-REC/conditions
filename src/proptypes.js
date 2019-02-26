import PropTypes from 'prop-types';
import { features } from './constants';

export const featureTypes = PropTypes.oneOf(Object.keys(features));

export const conditionsPerYear = PropTypes.shape({
  feature: featureTypes.isRequired,
  subFeature: PropTypes.string.isRequired,
  years: PropTypes.objectOf(PropTypes.number).isRequired,
});

export const allConditionsPerYear = PropTypes.arrayOf(conditionsPerYear);

export const ConditionsByCommodityOrInstrument = PropTypes.shape({
  prefix: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  commodity: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const allConditionsByCommodityOrInstrument = PropTypes.arrayOf(
  ConditionsByCommodityOrInstrument,
);
