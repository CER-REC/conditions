import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import handleInteraction from '../../../utilities/handleInteraction';

/* TODO:
1) Check if the text is overlapping another and change arc accordingly
2) Check if the inside text is smaller than circle radius, and shift the text
3) Add to onClick function to mimic design document functionality
*/

const pickColor = (category) => {
  switch (category) {
    case 'routing': return '#0E2B8C';
    case 'construction': return '#27A5F9';
    case 'abandonment': return '#164EF8';
    case 'misc': return '#D4A92A';
    case 'safety': return '#C904C2';
    case 'tariffs': return '#C3E6B3';
    case 'opening': return '#6AE6B2';
    default: return 'white';
  }
};

class InstrumentBubble extends React.PureComponent {
  static propTypes = {
    instrumentChartData: PropTypes.instanceOf(Object).isRequired, // Placeholder
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  circleRender = (nodes, onClick) => (
    nodes.filter(v => (v.depth !== 0))
      .map((node) => {
        // Renders parent circles (ie Energy bubbles)
        if (node.depth === 1) {
          // Create curved path for parentNode text
          const textCurvedPath = `M ${(node.x - node.r)},${(node.y - 1)} A ${node.r},${node.r} 0 0,1 ${(node.x + node.r)},${(node.y - 1)}`;
          return (
            <g key={node.data.parentName}>
              <path id={`${node.data.parentName}path`} d={textCurvedPath} style={{ fill: 'none', stroke: 'transparent' }} />
              <circle
                {...handleInteraction(onClick)}
                transform={`translate(${node.x} ${node.y})`}
                r={node.r}
                tabIndex="0"
                style={{
                  fill: 'transparent',
                  stroke: '#EDEDED',
                  strokeWidth: 2,
                }}
              />
              <text>
                <textPath href={`#${node.data.parentName}path`} textAnchor="middle" startOffset="50%">
                  {node.data.parentName}
                </textPath>
              </text>
            </g>
          );
        }

        let textY;
        let textColor;
        if (node.r > node.value) {
          textY = node.y - (node.r * 0.45);
          textColor = 'black';
        } else {
          textY = node.y;
          textColor = 'white';
        }
        // Nested Children circles (ie Instruments)
        return (
          <g
            key={node.data.name}
          >
            <circle
              r={node.r}
              transform={`translate(${node.x} ${node.y})`}
              style={{ fill: 'transparent', stroke: 'transparent' }}
            />
            <circle
              {...handleInteraction(onClick)}
              r={node.value}
              transform={`translate(${node.x} ${node.y})`}
              tabIndex="0"
              style={{ fill: pickColor(node.data.category) }}
            />
            <text x={node.x} y={textY} textAnchor="middle" stroke="transparent" fill={textColor}>{node.data.name}</text>
          </g>
        );
      })
  )

  d3HierarchyCalculation() {
    const { width, height, instrumentChartData } = this.props;
    //  d3 pack generates a function to fit data into tightly packed circles
    // Renders all the circle propertly with proper thickness so it always fits the circle.
    const pack = d3.pack()
      .size([width, height])
      .padding(node => (node.depth === 0 ? 0 : 5))
      .radius((node) => {
        const tempNode = node;
        const characterWidth = 5;
        const textLength = (node.data.name).length * characterWidth;
        const textHeight = 15;
        const textLengthExceeds = (tempNode.value * 2 <= textLength);
        if (textLengthExceeds) {
          return (tempNode.value) + (textLength); // buffer
        }
        if (tempNode.value < textHeight) {
          return tempNode.value + textHeight;
        }
        return node.value;
      });
    // creates the root node using d3 hierarchy similar to a tree layout
    const root = d3.hierarchy(instrumentChartData)
      .sum(totalData => totalData.value)
      .sort((a, b) => (b.value - a.value));
    return pack(root).descendants();
  }

  render() {
    const { width, height, onClick } = this.props;
    const d3Calculation = this.d3HierarchyCalculation();
    return (
      <svg width={width} height={height}>
        {this.circleRender(d3Calculation, onClick)}
      </svg>
    );
  }
}

export default InstrumentBubble;
