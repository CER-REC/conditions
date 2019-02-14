import PropTypes from 'prop-types';

export const keyword = PropTypes.shape({
  value: PropTypes.string.isRequired,
  textPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  outline: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  className: PropTypes.string.isRequired,
});

export const keywordList = PropTypes.arrayOf(keyword);
