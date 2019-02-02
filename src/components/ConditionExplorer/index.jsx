import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';
import shallowequal from 'shallowequal';
import PhysicsTest from './PhysicsTest';
import Fallback from './Fallback';
import './styles.scss';

// This function memoizes based on the keyword, but doesn't use it in the result
// function. It is only used in the (default) key generation function (2nd arg)
const randomColor = memoize(() => `color${Math.floor(Math.random() * 3)}`);

const setTimeoutChain = (callback, timeout, times) => {
  let remaining = times;
  const wrappedCallback = () => {
    if (remaining < 1) { return; }
    remaining -= 1;
    callback();
    if (remaining > 0) { setTimeout(wrappedCallback, timeout); }
  };
  setTimeout(wrappedCallback, timeout);
  return () => { remaining = 0; };
};

export default class ConditionExplorer extends React.Component {
  static propTypes = {
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    changeVisibleWords: PropTypes.func.isRequired,
    physics: PropTypes.bool,
  };

  static defaultProps = {
    physics: true,
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
    this.fontChangeRef = React.createRef();
    this.textSizeRef = React.createRef();
    this.state = { calculatedFontSize: null };
  }

  componentDidMount() {
    // Check every 100ms for 5 seconds for a font change
    this.cancelFontDetection = setTimeoutChain(this.testFontSize, 100, 50);
    // TODO: Find better solution for first mount blanking
    this.testFontSize();
  }

  componentDidUpdate() {
    this.testFontSize();
  }

  getKeywords() {
    if (!this.textSizeRef.current || !this.state.calculatedFontSize) { return []; }
    const size = !this.svgRef.current
      ? { width: 0, height: 0 }
      : {
        width: this.svgRef.current.width.baseVal.value,
        height: this.svgRef.current.height.baseVal.value,
      };

    const startX = -50; // Off the left edge to match design
    const margin = { width: 10, height: 10 };

    const lineHeight = this.state.calculatedFontSize.height + margin.height;
    // The top needs to be one line down to account for y=bottom of text
    let y = lineHeight - margin.height;
    let x = startX;

    return this.props.keywords
      .map((v) => {
        // TODO: Need a better way of shortcircuiting the map
        if (y > size.height) { return null; }

        const textSize = this.calculateTextSize(v);
        const outline = {
          x: x + textSize.xOffset,
          y: (y - textSize.height) + textSize.yOffset,
          width: textSize.width,
          height: textSize.height,
        };

        const textPosition = { x, y };

        x += textSize.width + margin.width;
        if (x >= size.width) {
          x = startX;
          y += lineHeight; // We don't add the text size since it may wrap
        }

        return {
          value: v,
          textPosition,
          textOffset: {
            x: -(outline.width / 2) - textSize.xOffset,
            y: textSize.yOffset,
          },
          outline,
          className: randomColor(v),
        };
      })
      // Filter out null values
      .filter(v => !!v);
  }

  testFontSize = () => {
    const { width, height, y } = this.fontChangeRef.current.getBBox();
    const newSize = { width, height, yOffset: height + y };
    const { calculatedFontSize: oldSize } = this.state;
    if (!shallowequal(newSize, oldSize)) {
      // The initial for oldSize is null, so the first detection of the fallback
      // font will set it to a truthy value. If it changes after that, we know
      // the real font has loaded in.
      if (oldSize) { this.cancelFontDetection(); }
      this.calculateTextSize.cache.clear();
      this.setState({ calculatedFontSize: newSize });
    }
  };

  render() {
    const { calculatedFontSize } = this.state;
    const keywords = this.getKeywords();
    let content = null;

    // There are no keywords to render until after the first mount
    if (keywords.length > 0) {
      content = this.props.physics
        ? <PhysicsTest keywords={keywords} fontMeasurement={calculatedFontSize} />
        : <Fallback keywords={keywords} fontMeasurement={calculatedFontSize} />;
    }

    return (
      <svg
        ref={this.svgRef}
        className="ConditionExplorer"
        width="500"
        height="500"
        style={{ border: '1px solid #000' }}
      >
        <text ref={this.fontChangeRef} style={{ visibility: 'hidden' }}>
          abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ-.,0123456789
        </text>
        <text ref={this.textSizeRef} style={{ visibility: 'hidden' }} />
        {content}
      </svg>
    );
  }
}
