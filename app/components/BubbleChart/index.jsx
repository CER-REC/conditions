import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import handleInteraction from '../../utilities/handleInteraction';


class BubbleChart extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const bubbleChartData = {
      GAS: {
        name: 'GAS',
        category: 'gas',
        children: [
          {
            name: 'XG',
            children: [],
            value: 0.50,
            category: 'construction',
          },
          {
            name: 'GC',
            children: [],
            value: 0.20,
            category: 'construction',
          },
          {
            name: 'GPSO',
            children: [],
            value: 0.10,
            category: 'opening',
          },
          {
            name: 'SG',
            children: [],
            value: 0.10,
            category: 'safety',
          },
          {
            name: 'GPLO',
            children: [],
            value: 0.10,
            category: 'opening',
          },
        ],
        value: 1,
      },
      POWER: {
        name: 'POWER',
        category: 'power',
        children: [
          {
            name: 'EC',
            children: [],
            value: 0.10,
            category: 'construction',
          },
          {
            name: 'EPE',
            children: [],
            value: 0.10,
            category: 'construction',
          },
        ],
        value: 5,
      },
      OIL: {
        name: 'OIL',
        category: 'oil',
        children: [{
          name: 'XO',
          children: [],
          value: 25,
          category: 'construction',
        },
        {
          name: 'SO',
          children: [],
          value: 0.25,
          category: 'safety',
        }, {
          name: 'OC',
          children: [],
          value: 25,
          category: 'construction',
        }, {
          name: 'OPL',
          children: [],
          value: 0.25,
          category: 'routing',
        }, {
          name: 'OPLO',
          children: [],
          value: 0.04,
          category: 'opening',
        }, {
          name: 'OPSO',
          children: [],
          value: 0.04,
        }],
      },
      'Not Specified': {
        name: 'Not Specified',
        category: 'not specified',
        children: [{
          name: 'XC',
          category: 'tariffs',
          value: 0.04,
        }, {
          name: 'CO',
          category: 'tariffs',
          value: 0.04,
        }],
      },
    };
    this.fauxDOMRender(null, bubbleChartData);
  }

  setRef(componentNode) {
    this.rootNode = componentNode;
  }

  fauxDOMRender(err, data) {
    const node = this.rootNode;
    data = data.GAS;
    const d = this.props.width;
    const sizeScale = d3.scaleSqrt().range([5, 100]);
    const svg = d3.select(node).append('svg').attr('width', this.props.width).attr('height', this.props.height);
    const pack = d3.pack().size([d, d]).padding(5).radius( d => sizeScale(d.value));
    const root = d3.hierarchy(data);
    const nodes = svg.datum(data)
      .selectAll('g')
      .data(pack(root).descendants())
      // .call((d) => console.log(d._enter[0][0].__data__.r)) // get's the radius of the maximum circle which is the radius of 150
      .enter()
      .append('g')
      .attr('transform', transformD => `translate(${  transformD.x  },${  transformD.y  })`);
    nodes.append('circle')
      .each((d, i, nodes) =>
        d3.select(nodes[i])
          .attr('r', (d.r))
          .style('fill', (d) => {
            // if (d.data.category === 'construction') { return 'orange'; }
            return 'orange';
          })
          .style('stroke', 'transparent')
          .attr('fill-opacity', d.children ? 0.25 : 1.0)
          .attr('stroke', d.children ? 'rgb(31, 119, 180)' : 'none'))
          .on('click', (d, i, nodes) => {
            d3.selectAll(nodes).style('stroke', 'transparent');
            d3.select(nodes[i]).style('stroke', 'magenta').style('stroke-width', '2');
            svg.selectAll('path').remove();
            svg.append('g').append('path').attr('d', "M 5 5 L 15 5 L 10 15 z").attr('transform', 'translate(' + d.x + ')')
          })
            // Draw an svg when received the x and y values
    nodes.filter(d => !d.children)
      .append('text')
      .attr('ref', 'check')
      .attr('dy', '0.5em')
      .style('text-anchor', 'middle')
      .style('font', '8px sans-serif')
      .text(d => d.data.name.substring(0, d.r));
  }

  render() {
    if (this.props.selectedCategory !== 'instrument') {
      return null;
    }
    return (
      <div className="bubbleChart" ref={this.setRef.bind(this)} />);
  }

}

export default BubbleChart;
