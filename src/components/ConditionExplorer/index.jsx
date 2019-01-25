import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';
import classNames from 'classnames';
import handleDrag from '../../utilities/handleDrag';
import './styles.scss';

// This function memoizes based on the keyword, but doesn't use it in the result
// function. It is only used in the (default) key generation function (2nd arg)
const randomColor = memoize(() => `color${Math.floor(Math.random() * 3)}`);

const testForCollision = (circle, rect) => {
  const deltaX = circle.x - Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const deltaY = circle.y - Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  return (deltaX ** 2) + (deltaY ** 2) < (circle.r ** 2);
};

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
      guide: { x: 100, y: 100, r: 50 },
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

    const lineHeight = this.calculateTextSize('Placeholder hanging').height + margin.height;
    // The top needs to be one line down to account for y=bottom of text
    let y = lineHeight - margin.height;
    let x = startX;

    return this.props.keywords.map((v) => {
      // TODO: Need a better way of shortcircuiting the map
      if (y > size.height) { return null; }

      const textSize = this.calculateTextSize(v);
      const outline = {
        x: x + textSize.xOffset,
        y: (y - textSize.height) + textSize.yOffset,
        width: textSize.width,
        height: textSize.height,
      };

      const textVisible = testForCollision(this.state.guide, outline);

      const el = (
        <g key={v} className={classNames('keyword', { textVisible })}>
          <text key={v} x={x} y={y}>{v}</text>
          <rect {...outline} className={randomColor(v)} />
        </g>
      );

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
      : { top: 0, left: 0 };
    this.setState(({ guide }) => ({
      guide: {
        ...guide,
        x: x - svgBounds.left,
        y: y - svgBounds.top,
      },
    }));
  };

  render() {
    // These props are split between circle and SVG to provide better control
    // when dragging quickly.
    const { onMouseDown, ...dragProps } = handleDrag(this.updateGuidePosition);
    return (
      <svg
        ref={this.svgRef}
        className="ConditionExplorer"
        width="500"
        height="500"
        style={{ border: '1px solid #000' }}
        {...dragProps}
      >
        <text ref={this.textSizeRef} style={{ visibility: 'hidden' }} />
        {this.getKeywords()}
        <circle
          fill="transparent"
          stroke="#000"
          cx={this.state.guide.x}
          cy={this.state.guide.y}
          r={this.state.guide.r}
          onMouseDown={onMouseDown}
        />
      </svg>
    );
  }
}
