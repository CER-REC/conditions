import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const LegendItem = props => (
  <div className={`LegendItem ${props.unhighlight ? 'unhighlight' : ''}`}>
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
    date: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  })),
  /** The flag to determine if the component renders with the unhighlight class */
  unhighlight: PropTypes.bool,
};

LegendItem.defaultProps = {
  data: null,
  unhighlight: false,
};

// TODO: Wrap in React.memo when testing issue fixed
export default LegendItem;
