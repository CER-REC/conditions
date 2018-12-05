import React from 'react';
import PropTypes from 'prop-types';
import { VictoryArea } from 'victory';

import './styles.scss';

const StreamLayer = (props) => {
  if (props.projectData.length === 0) { return null; }
  return (
    <VictoryArea
      name={props.projectData[0].id}
      data={props.projectData[0].graphData.map(k => ({ x: k.date, y: k.count }))}
      style={{
        data: {
          fill: props.projectData[0].color,
        },
      }}
      interpolation="natural"
    />
  );
};

StreamLayer.propTypes = {
  projectData: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    graphData: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};

export default StreamLayer;
