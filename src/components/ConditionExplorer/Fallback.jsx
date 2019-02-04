import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import handleDrag from '../../utilities/handleDrag';
import { keywordList } from './proptypes';

const testForCollision = (circle, rect) => {
  const deltaX = circle.x - Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const deltaY = circle.y - Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  return (deltaX ** 2) + (deltaY ** 2) < (circle.r ** 2);
};

export default class Fallback extends React.Component {
  static propTypes = {
    keywords: keywordList.isRequired,
  };

  constructor(props) {
    super(props);
    this.groupRef = React.createRef();

    this.state = {
      guide: { x: 100, y: 100, r: 50 },
    };
  }

  renderKeywords = () => this.props.keywords.map((keyword) => {
    const textVisible = testForCollision(this.state.guide, keyword.outline);
    return (
      <g
        key={keyword.value}
        className={classNames('keyword', keyword.className, { textVisible })}
      >
        <text
          x={keyword.outline.x}
          y={keyword.outline.y + keyword.textOffset.y}
        >
          {keyword.value}
        </text>
        <rect {...keyword.outline} />
      </g>
    );
  });

  updateGuidePosition = (x, y) => {
    const svgBounds = this.groupRef.current
      ? this.groupRef.current.parentElement.getBoundingClientRect()
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
      <g ref={this.groupRef} {...dragProps}>
        {this.renderKeywords()}
        <circle
          fill="transparent"
          stroke="#000"
          cx={this.state.guide.x}
          cy={this.state.guide.y}
          r={this.state.guide.r}
          onMouseDown={onMouseDown}
        />
      </g>
    );
  }
}
