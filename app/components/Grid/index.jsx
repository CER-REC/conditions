import React from 'react';
import PropTypes from 'prop-types';
import GridItem from './GridItem';
import './styles.scss';

const Grid = (props) => {
  const { children } = props;
  const views = children.map(child => <GridItem>{child}</GridItem>);
  return (
    <main className="Grid" {...props}>
      {views}
    </main>
  );
};

Grid.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  rowGutters: PropTypes.string,
  columnGutters: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
};

Grid.defaultProps = {
  rowGutters: null,
  columnGutters: null,
  children: [],
};

export default Grid;
