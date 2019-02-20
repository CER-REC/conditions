import PropTypes from 'proptypes';

export const conditionsPerYear = PropTypes.shape({
  feature: PropTypes.string.isRequired,
  subfeature: PropTypes.string.isRequired,
  years: PropTypes.objectOf(PropTypes.number).isRequired,
});

export const allConditionsPerYear = PropTypes.arrayOf(conditionsPerYear);
