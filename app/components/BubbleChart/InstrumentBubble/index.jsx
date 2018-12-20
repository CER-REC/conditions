import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class InstrumentBubble extends React.PureComponent {
  static propTypes = {
    instrumentChartData: PropTypes.instanceOf(Object).isRequired, // Placeholder
  }

  componentDidMount() {
    this.fauxDOMRender(null, this.props.instrumentChartData);
  }

  setRef(componentNode) {
    this.rootNode = componentNode;
  }

  fauxDOMRender(err, data) {
    const node = this.rootNode;
    const d = 650;
    const svg = d3.select(node).append('svg').attr('width', 650).attr('height', 650);
    const pack = d3.pack().size([d, d]).padding(10).radius(r => r.value);
    const root = d3.hierarchy(data)
      .sum(totalData => totalData.value).sort((a, b) => (b.value - a.value));
    const nodes = svg.datum(data)
      .selectAll('g')
      .data(pack(root).descendants())
      .enter()
      .append('g')
      .attr('transform', transformD => `translate(${transformD.x}, ${transformD.y})`);
    nodes.append('circle')
      .each((circleData, i, circleNodes) => d3.select(circleNodes[i])
        .attr('r', (circleData.r))
        .style('fill', 'orange') // To do: Alter the color to change with category
        .style('stroke', 'transparent')
        .attr('tabindex', '0')
        .attr('fill-opacity', circleData.children ? 0.25 : 1.0)
        .attr('stroke', circleData.children ? 'rgb(31, 119, 180)' : 'none'))
      .on('click', (clickData, i, clickNodes) => {
        d3.selectAll(clickNodes).style('stroke', 'transparent');
        d3.select(clickNodes[i]).style('stroke', 'magenta').style('stroke-width', '2');
        svg.selectAll('path').remove();
        svg.append('g').append('path').attr('d', 'M 5 5 L 15 5 L 10 15 z').attr('transform', `translate(${clickData.x})`);
      })
      .on('keypress', (keypressData, i, keypressNodes) => {
        if (d3.event.keyCode === 13) {
          d3.selectAll(nodes).style('stroke', 'transparent');
          d3.select(nodes[i]).style('stroke', 'magenta').style('stroke-width', '2');
          svg.selectAll('path').remove();
          svg.append('g').append('path').attr('d', 'M 5 5 L 15 5 L 10 15 z').attr('transform', `translate(${keypressNodes.x})`);
          // To do: Add dashed line from the arrow to the circle.
        }
      });

    nodes.filter(parentData => parentData.children)
      .append('text')
      .attr('dy', filteredData => filteredData.r)
      .text((parentData) => {
        if (parentData.data.parentName !== undefined) {
          return parentData.data.parentName.substring(0, parentData.r);
        }
        return null;
      });
    nodes.filter(childrenData => !childrenData.children)
      .append('text')
      .attr('ref', 'check')
      .attr('dy', '0.5em')
      .style('text-anchor', 'middle')
      .style('font', '8px sans-serif')
      .text(childrenData => childrenData.data.name.substring(0, d.r))
      .attr('class', 'textRender')
      .on('click', (clickData, i, clickNodes) => {
        // To do: Render once to get computedTextLength > and reRender with appropriate circle sizes
        console.log(clickNodes[i].getComputedTextLength());
        // Will be used to grab the text length (during first render) and create
        // a second circle with the text rendering
      });
  }

  render() {
    return (
      <div className="InstrumentBubble" ref={this.setRef.bind(this)} />);
  }
}

export default InstrumentBubble;
