import React from 'react';
import PropTypes from 'prop-types';

const SmallMultiplesLegendItem = props => (
  <div>
    <span>[TODO: Change to graph]</span>
    <span>{props.title}</span>
  </div>
);

SmallMultiplesLegendItem.propTypes = {
  title: PropTypes.string.isRequired,
  // TODO: Remove ESLint suppression when the graph feature is implemented
  // eslint-disable-next-line react/no-unused-prop-types
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    number: PropTypes.number.isRequired,
  })),
};

SmallMultiplesLegendItem.defaultProps = {
  data: null,
};

// TODO: Wrap in React.memo when testing issue fixed
export default SmallMultiplesLegendItem;
