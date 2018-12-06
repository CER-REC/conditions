import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const LegendItem = props => (
  <div className={`LegendItem ${props.className} ${props.unhighlight ? 'unhighlight' : ''}`}>
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
  /** The y-axis height to set the graph */
  // TODO: Remove ESLint suppression when the graph feature is implemented
  // eslint-disable-next-line react/no-unused-prop-types
  max: PropTypes.number,
  /** The flag to determine if the component renders with the unhighlight class */
  unhighlight: PropTypes.bool,
  /** Additional className to add to the list */
  className: PropTypes.string,
};

LegendItem.defaultProps = {
  data: null,
  max: null,
  unhighlight: false,
  className: '',
};

// TODO: Wrap in React.memo when testing issue fixed
export default LegendItem;
