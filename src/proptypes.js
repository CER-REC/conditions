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
  secondary: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const location = PropTypes.shape({
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: featureData.isRequired,
});

export const project = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
    french: PropTypes.string.isRequired,
  }).isRequired,
  shortName: PropTypes.shape({
    english: PropTypes.string.isRequired,
    french: PropTypes.string.isRequired,
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
