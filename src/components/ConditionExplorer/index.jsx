import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';
import handleDrag from '../../utilities/handleDrag';
import './styles.scss';

export default class ConditionExplorer extends React.Component {
  static propTypes = {
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    changeVisibleWords: PropTypes.func.isRequired,
  };

  calculateTextSize = memoize((text) => {
    const el = this.textSizeRef.current;
    el.textContent = text;
    /* eslint-disable object-curly-newline */
    const { width, height, x, y } = el.getBBox();
    return { width, height, xOffset: x, yOffset: height + y };
    /* eslint-enable object-curly-newline */
  });

  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.textSizeRef = React.createRef();

    this.state = {
      guidePosition: { x: 100, y: 100 },
      guideRadius: 50,
    };
  }

  componentDidMount() {
    // TODO: Find better solution for first mount blanking
    this.forceUpdate();
  }

  getKeywords() {
    if (!this.textSizeRef.current) { return []; }
    const size = !this.svgRef.current
      ? { width: 0, height: 0 }
      : {
        width: this.svgRef.current.width.baseVal.value,
        height: this.svgRef.current.height.baseVal.value,
      };

    const startX = -50; // Off the left edge to match design
    const margin = { width: 10, height: 10 };

    const lineHeight = this.calculateTextSize('Placeholder').height + margin.height;
    // The top needs to be one line down to account for y=bottom of text
    let y = lineHeight - margin.height;
    let x = startX;

    const { guidePosition, guideRadius } = this.state;

    return this.props.keywords.map((v) => {
      // TODO: Need a better way of shortcircuiting the map
      if (y > size.height) { return null; }

      const textSize = this.calculateTextSize(v);
      const outline = {
        x: x + textSize.xOffset,
        y: (y - textSize.height) + textSize.yOffset,
        ...textSize,
      };

      const el = (
        guidePosition.x - guideRadius < outline.x + outline.width
        && guidePosition.x + guideRadius > outline.x
        && guidePosition.y - guideRadius < outline.y + outline.height
        && guidePosition.y + guideRadius > outline.y
      )
        ? <text key={v} x={x} y={y} color="#000">{v}</text>
        : <rect key={v} {...outline} fill="red" />;
      x += textSize.width + margin.width;
      if (x >= size.width) {
        x = startX;
        y += lineHeight; // We don't add the text size since it may wrap
      }
      return el;
    });
  }

  updateGuidePosition = (x, y) => {
    const svgBounds = this.svgRef.current
      ? this.svgRef.current.getBoundingClientRect()
      : { x: 0, y: 0 };
    this.setState({
      guidePosition: {
        x: x - svgBounds.x,
        y: y - svgBounds.y,
      },
    });
  };

  render() {
    return (
      <svg
        ref={this.svgRef}
        width="500"
        height="500"
        style={{ border: '1px solid #000' }}
      >
        <text ref={this.textSizeRef} style={{ visibility: 'hidden' }} />
        {this.getKeywords()}
        <circle
          fill="transparent"
          stroke="#000"
          cx={this.state.guidePosition.x}
          cy={this.state.guidePosition.y}
          r={this.state.guideRadius}
          {...handleDrag(this.updateGuidePosition)}
        />
      </svg>
    );
  }
}
