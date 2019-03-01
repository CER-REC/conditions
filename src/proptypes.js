import PropTypes from 'prop-types';
import { features } from './constants';

export const featureTypes = PropTypes.oneOf(Object.keys(features));

export const conditionsPerYear = PropTypes.shape({
  feature: featureTypes.isRequired,
  subFeature: PropTypes.string.isRequired,
  years: PropTypes.objectOf(PropTypes.number).isRequired,
});

export const featureData = PropTypes.shape({
  instrument: PropTypes.objectOf(PropTypes.number).isRequired,
  theme: PropTypes.objectOf(PropTypes.number).isRequired,
  phase: PropTypes.objectOf(PropTypes.number).isRequired,
  status: PropTypes.objectOf(PropTypes.number).isRequired,
  type: PropTypes.objectOf(PropTypes.number).isRequired,
  filing: PropTypes.objectOf(PropTypes.number).isRequired,
});

export const company = PropTypes.shape({
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const location = PropTypes.shape({
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  data: featureData.isRequired,
});

export const project = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.shape({
    en: PropTypes.string.isRequired,
    fr: PropTypes.string.isRequired,
  }).isRequired,
  shortName: PropTypes.shape({
    en: PropTypes.string.isRequired,
    fr: PropTypes.string.isRequired,
  }).isRequired,
  data: featureData.isRequired,
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

export const browseByType = PropTypes.oneOf(['company', 'location']);

export const allCompanyData = PropTypes.arrayOf(
  company,
);

export const allLocationData = PropTypes.arrayOf(
  location,
);

export const yearRangeType = PropTypes.shape({
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
});

export const suggestedKeywordsObject = PropTypes.objectOf(
  PropTypes.shape({
    conditions: PropTypes.number.isRequired,
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
);

// Used in Keyword List (SuggestedKeywords)
// Example: [ ["safety", { conditions: 1200, category: ['category1', 'category2']}],
// ["emissions", { conditions: 400, category: ['category2', 'category3]}]]

export const suggestedKeywordsArrayType = PropTypes
  .arrayOf((props, propName, componentName, _, propFullName) => {
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