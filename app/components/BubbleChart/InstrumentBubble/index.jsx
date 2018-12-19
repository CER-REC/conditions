import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';


class InstrumentBubble extends React.PureComponent {

  componentDidMount() {
    this.fauxDOMRender(null, this.props.bubbleChartData);
  }

  setRef(componentNode) {
    this.rootNode = componentNode;
  }

  fauxDOMRender(err, data) {
    const node = this.rootNode;
    const d = 650;
    // const sizeScale = d3.scaleSqrt().range([5, 100]); Optional: to 
    const svg = d3.select(node).append('svg').attr('width', 650).attr('height', 650);
    const pack = d3.pack().size([d,d]).padding(10).radius( d => d.value);
    const root = d3.hierarchy(data).sum(d => d.value).sort((a,b) => (b.value - a.value));
    const nodes = svg.datum(data)
      .selectAll('g')
      .data(pack(root).descendants())
      .enter()
      .append('g')
      .attr('transform', transformD => `translate(${  transformD.x  },${  transformD.y  })`);
    nodes.append('circle')
      .each((d, i, nodes) =>
        d3.select(nodes[i])
          .attr('r', (d.r))
          .style('fill', (d) => {
            return 'orange';
          })
          .style('stroke', 'transparent')
          .attr('tabindex', '0')
          .attr('fill-opacity', d.children ? 0.25 : 1.0)
          .attr('stroke', d.children ? 'rgb(31, 119, 180)' : 'none'))
          .on('click', (d, i, nodes) => {
            d3.selectAll(nodes).style('stroke', 'transparent');
            d3.select(nodes[i]).style('stroke', 'magenta').style('stroke-width', '2');
            svg.selectAll('path').remove();
            svg.append('g').append('path').attr('d', "M 5 5 L 15 5 L 10 15 z").attr('transform', 'translate(' + d.x + ')')
          })
          .on('keypress', (d, i, nodes) => {
            if (d3.event.keyCode === 13) {
              d3.selectAll(nodes).style('stroke', 'transparent');
              d3.select(nodes[i]).style('stroke', 'magenta').style('stroke-width', '2');
              svg.selectAll('path').remove();
              svg.append('g').append('path').attr('d', "M 5 5 L 15 5 L 10 15 z").attr('transform', 'translate(' + d.x + ')')  
            }
          })

    nodes.filter(d => d.children)
      .append('text')
      .attr('dy', d => d.r)
      .text(d => {
        if (d.data.parentName !== undefined){
          return d.data.parentName.substring(0, d.r)
        }
      })
    nodes.filter(d => !d.children)
      .append('text')
      .attr('ref', 'check')
      .attr('dy', '0.5em')
      .style('text-anchor', 'middle')
      .style('font', '8px sans-serif')
      .text(d => d.data.name.substring(0, d.r))
      .attr('class', 'textRender')
      .on('click', (d, i , nodes) => {
        console.log(nodes[i].getComputedTextLength()) // Will be used to grab the text length (during first render) and create a second circle for the text rendering
      });
  }

  render() {
    return (
      <div className="instrumentBubble" ref={this.setRef.bind(this)} />);
  }
}

export default InstrumentBubble;
