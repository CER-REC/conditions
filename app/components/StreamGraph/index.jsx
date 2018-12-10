import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAxis, VictoryArea, VictoryStack, VictoryChart } from 'victory';

import './styles.scss';

export const numOfConditionsLabel = point => `${Math.round(point.y)} conditions`;

export const roundDateLabel = t => Math.round(t);

const Streamgraph = (props) => {
  const numOfConditions = props.projectData.map(k => k.graphData.map(v => v.count));
  const numOfConditionsConcat = [].concat(...numOfConditions);

  const minConditionValue = Math.min(...numOfConditionsConcat);

  const date = props.projectData.map(k => k.graphData.map(v => v.date));
  const dateConcat = [].concat(...date);

  const minDateValue = Math.min(...dateConcat);
  const maxDateValue = Math.max(...dateConcat);

  let conditionDates = props.projectData.reduce((acc, next) => {
    next.graphData.forEach((v) => {
      if (!acc[v.date]) { acc[v.date] = 0; }
      acc[v.date] += v.count;
    });
    return acc;
  }, {});

  conditionDates = Object.values(conditionDates);
  const maxConditionValue = Math.max(...conditionDates);

  const streamLayers = props.projectData.map(v => (
    <VictoryArea
      key={v.key}
      name={v.name}
      data={v.graphData.map(k => ({ x: k.date, y: k.count }))}
      style={{
        data: {
          fill: v.color,
          opacity: 1,
          stroke: 'black',
          strokeWidth: 0,
        },
      }}
      interpolation="natural"
    />
  ));

  return (
    <div className="streamgraph">
      <h1>Total Conditions by Theme Over Time</h1>
      <VictoryChart>
        <VictoryAxis
          dependentAxis
          label="Number of Conditions"
          tickValues={[minConditionValue, maxConditionValue]}
          className="axis-label"
        />
        <VictoryAxis
          label="Effective Date"
          tickFormat={roundDateLabel}
          className="axis-label"
          domain={[minDateValue, maxDateValue]}
        />
        <VictoryStack
          events={[{
            childName: props.projectData.map(v => v.name),
            target: 'data',
            eventHandlers: {
              onClick: (evt, clickedProps) => {
                const clickedIndex = clickedProps.id;
                return [
                  {
                    target: 'data',
                    eventKey: props.projectData.name,
                    mutation: (props) => {
                      const styles = {
                        opacity: props.style && props.style.opacity,
                        stroke: props.style && props.style.stroke,
                        strokeWidth: props.style && props.style.strokeWidth,
                      };
                      let opacity = props.style && props.style.opacity;
                      let stroke = props.style && props.style.stroke;
                      let strokeWidth = props.style && props.style.strokeWidth;
                      console.log(opacity, stroke, strokeWidth);
                      // if (clickedIndex) {
                      //   return styles;
                      // }
                      const fill = props.style && props.style.fill;
                      return fill === "black" ? null : { style: { fill: "black" } };
                    },
                  },
              ];
            },
          },
          }]}
        >
          {streamLayers}
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};

Streamgraph.propTypes = {
  projectData: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
    graphData: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  style: PropTypes.func.isRequired,
};

export default Streamgraph;
