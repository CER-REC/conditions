import React from 'react';
import PropTypes from 'prop-types';
import { VictoryArea } from 'victory';

import './styles.scss';

const StreamLayer = props => (
  <VictoryArea
    key={props.projectKey}
    name={props.projectName}
    data={props.dataValues.map(k => ({ x: k.date, y: k.count }))}
    style={{
      data: {
        fill: props.projectColor,
        stroke: props.strokeColor,
        strokeWidth: props.strokeWidth,
      },
    }}
    standalone={props.standalone}
    interpolation="natural"
  />
);

StreamLayer.propTypes = {
  projectKey: PropTypes.number,
  projectName: PropTypes.string,
  projectColor: PropTypes.string,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  standalone: PropTypes.bool,
  dataValues: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  })),
};

StreamLayer.defaultProps = {
  projectName: 'themeNumber',
  projectKey: 2420,
  projectColor: 'grey',
  strokeColor: 'none',
  standalone: true,
  strokeWidth: 0,
  dataValues: [
    { date: 2010, count: 20 },
    { date: 2011, count: 40 },
    { date: 2012, count: 60 },
    { date: 2013, count: 10 },
    { date: 2014, count: 100 },
    { date: 2015, count: 22 },
    { date: 2016, count: 81 },
    { date: 2017, count: 48 },
  ],
};

export default StreamLayer;
