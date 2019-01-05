import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

// TODO: This is a mock, replace with the translation function
const t = (searchList) => {
  if (searchList[1] === 'all') {
    return `All ${searchList[2]}s`;
  }

  return searchList[2];
};

const LegendItem = (props) => {
  let indicators;
  const type = props.all ? 'all' : 'title';

  if (!props.all) {
    indicators = props.indicators.map((indicator) => {
      const style = indicator ? { backgroundColor: props.color } : {};

      return <div className="indicator" style={style} />;
    });
  }

  return (
    <div className={`LegendItem ${props.className}`}>
      <span className="indicators">
        {indicators}
      </span>
      <span>{t(['instrumentsLegend', type, props.title])}</span>
    </div>
  );
};

LegendItem.propTypes = {
  /** The text beside the indicators */
  title: PropTypes.string.isRequired,
  /** The list of flags to toggle the display of the indicators */
  indicators: PropTypes.arrayOf(PropTypes.bool).isRequired,
  /** The color of the indicators */
  color: PropTypes.string.isRequired,
  /** The flag to determine if the component renders as a all filter item */
  all: PropTypes.bool,
  /** Additional className to add to the component */
  className: PropTypes.string,
};

LegendItem.defaultProps = {
  all: false,
  className: '',
};

// TODO: Wrap in React.memo when testing issue fixed
export default LegendItem;
