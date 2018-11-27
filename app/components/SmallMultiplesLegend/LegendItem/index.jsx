import React from 'react';
import PropTypes from 'prop-types';

const LegendItem = props => (
  <div>
    <span>[TODO: Change to graph]</span>
    <span>{props.title}</span>
  </div>
);

LegendItem.propTypes = {
  /** The text beside the stream graph */
  title: PropTypes.string.isRequired,
  /** The data to render the stream graph */
  // TODO: Remove ESLint suppression when the graph feature is implemented
  // eslint-disable-next-line react/no-unused-prop-types
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    number: PropTypes.number.isRequired,
  })),
};

LegendItem.defaultProps = {
  data: null,
};

// TODO: Wrap in React.memo when testing issue fixed
export default LegendItem;
