import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';
import './styles.scss';

export default class ConditionExplorer extends React.Component {
  static propTypes = {
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    changeVisibleWords: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.textSizeRef = React.createRef();
  }

  componentDidMount() {
    // TODO: Find better solution for first mount blanking
    this.forceUpdate();
  }

  calculateTextSize = memoize((text) => {
    const el = this.textSizeRef.current;
    el.textContent = text;
    const { width, height } = el.getBBox();
    return { width, height };
  });

  render() {
    let keywords = [];
    const size = !this.svgRef.current
      ? { width: 0, height: 0 }
      : {
        width: this.svgRef.current.width.baseVal.value,
        height: this.svgRef.current.height.baseVal.value,
      };
    if (this.textSizeRef.current) {
      let x = 0;
      // The top needs to be one line down to account for y=bottom of text
      let y = this.calculateTextSize(this.props.keywords[0]).height;
      keywords = this.props.keywords.map((v) => {
        const textSize = this.calculateTextSize(v);
        if (x + textSize.width > size.width) {
          x = 0;
          y += textSize.height;
        }
        if (y > size.height) {
          return null;
        }
        const el = (
          <text
            key={v}
            x={x}
            y={y}
            alignmentBaseline="top"
            color="#000"
          >
            {v}
          </text>
        );
        x += textSize.width;
        return el;
      });
    }

    return (
      <svg
        ref={this.svgRef}
        width="500"
        height="500"
        style={{ border: '1px solid #000' }}
      >
        <text ref={this.textSizeRef} style={{ visibility: 'hidden' }} />
        {keywords}
      </svg>
    );
  }
}
