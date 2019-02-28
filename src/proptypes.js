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

export const yearRangeType = PropTypes.shape({
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
});

export const suggestedKeywordsType = PropTypes
  .arrayOf((props, propName, componentName, location, propFullName) => {
    const value = props[propName];
    if (!Array.isArray(value) || value.length !== 2) {
      return new Error(
        `Invalid prop \`${propFullName}\` supplied to \`${componentName}\`. Expected keyword tuple.`,
      );
    }
    if (typeof value[0] !== 'string') {
      return new Error(
        `Invalid prop \`${propFullName}[0]\` supplied to \`${componentName}\`. Expected keyword tuple.`,
      );
    }
    return PropTypes.checkPropTypes({
      conditions: PropTypes.number.isRequired,
      category: PropTypes.arrayOf(PropTypes.string).isRequired,
    }, value[1], `${propFullName}[1]`, componentName);
  });
