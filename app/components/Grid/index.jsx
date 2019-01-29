import React from 'react';
import PropTypes from 'prop-types';
import GridItem from './GridItem';
import './styles.scss';

const Grid = (props) => {
  const { children, type } = props;
  const views = children.map((child, index) => <GridItem key={index.toString()}>{child}</GridItem>);
  if (type) {
    const TypedWrapper = type;
    return (
      <TypedWrapper
        className="Grid"
      >
        {views}
      </TypedWrapper>
    );
  }
  return (
    <main className="Grid">
      {views}
    </main>
  );
};

Grid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  type: PropTypes.string,
};

Grid.defaultProps = {
  type: null,
  children: [],
};

export default Grid;
