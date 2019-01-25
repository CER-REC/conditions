import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const GridItem = props => <section className="item">{props.children}</section>;

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GridItem;
