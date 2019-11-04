import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';
import shallowequal from 'shallowequal';
import PhysicsVariant from './PhysicsVariant';
import Fallback from './Fallback';
import GuideDetail from './GuideDetail';
import './styles.scss';

import { reportAnalytics } from '../../utilities/analyticsReporting';
import english from '../../languages/english';

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

export default class ConditionExplorer extends React.PureComponent {
  calculateTextSize = memoize((text) => {
    const el = this.textSizeRef.current;
    el.textContent = text;
    const { width, height, x, y } = el.getBBox();
    return { width, height, xOffset: x, yOffset: height + y };
  });

  static propTypes = {
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedKeywordId: PropTypes.number,
    setSelectedKeyword: PropTypes.func.isRequired,
    beginTutorial: PropTypes.func.isRequired,
    physicsPaused: PropTypes.bool,
    physics: PropTypes.bool,
  };

  static defaultProps = {
    selectedKeywordId: -1,
    physics: true,
    physicsPaused: false,
  };

  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.fontChangeRef = React.createRef();
    this.textSizeRef = React.createRef();
    this.state = {
      fallbackFontSize: null,
      calculatedFontSize: null,
      guidePosition: { x: 0, y: 0, r: 0 },
      guideExpanded: false,
      guideStep: 0,
    };
  }

  componentDidMount() {
    // Check every 100ms for 5 seconds for a font change
    this.cancelFontDetection = setTimeoutChain(this.testFontSize, 100, 50);
  }

  setGuidePosition = (x, y, r) => this.setState({ guidePosition: { x, y, r } });

  setGuideExpanded = guideExpanded => this.setState({
    guideExpanded,
    guideStep: 0,
  });

  setGuideStep = (guideStep, e) => {
    const { title } = english.components.conditionExplorer.guide.pages[this.state.guideStep];
    reportAnalytics(e.type, 'guide', 'detail page', title);
    this.setState({ guideStep });
  };

  getKeywords() {
    if (!this.textSizeRef.current || !this.state.calculatedFontSize) { return []; }
    const size = !this.svgRef.current
      ? { width: 0, height: 0 }
      : {
        width: this.svgRef.current.width.baseVal.value,
        height: this.svgRef.current.height.baseVal.value,
      };

    const startX = -20; // Off the left edge to match design
    const margin = { width: 22, height: 22 };

    const lineHeight = this.state.calculatedFontSize.height + margin.height;
    // The top needs to be one line down to account for y=bottom of text
    let y = margin.height;
    let x = startX;

    return this.props.keywords
      .reduce((acc, v) => {
        if (y > size.height) { return acc; }

        const textSize = this.calculateTextSize(v);
        const outline = {
          x,
          y,
          width: textSize.width,
          height: textSize.height,
        };

        x += textSize.width + margin.width;
        if (x >= size.width) {
          x = startX;
          y += lineHeight; // We don't add the text size since it may wrap
        }

        acc.push({
          value: v,
          textOffset: {
            x: -(outline.width / 2) - (textSize.xOffset * 2),
            y: textSize.yOffset + (outline.height / 2),
          },
          textSize,
          outline,
          className: randomColor(v),
        });

        return acc;
      }, []);
  }

  testFontSize = () => {
    if (!this.fontChangeRef.current) { return; }
    const { width, height, y } = this.fontChangeRef.current.getBBox();
    const newSize = { width, height, yOffset: height + y };
    const { fallbackFontSize } = this.state;
    if (!fallbackFontSize) {
      this.setState({ fallbackFontSize: newSize });
    } else if (!shallowequal(newSize, fallbackFontSize)) {
      this.cancelFontDetection();
      this.calculateTextSize.cache.clear();
      this.setState({ calculatedFontSize: newSize });
    }
  };

  onKeywordClick = (e, instance) => {
    const instanceOut = (instance && e.currentTarget.classList.contains('textVisible'))
      ? instance
      : null;

    this.props.setSelectedKeyword(e, instanceOut);

    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  beginTutorial = () => {
    this.props.beginTutorial(this.state.guidePosition);
  };

  render() {
    const { calculatedFontSize } = this.state;
    const keywords = calculatedFontSize ? this.getKeywords() : [];
    let content = null;

    // There are no keywords to render until after the first mount
    if (keywords.length > 0) {
      const contentProps = {
        keywords,
        selectedKeywordId: this.props.selectedKeywordId,
        onKeywordClick: this.onKeywordClick,
        setGuidePosition: this.setGuidePosition,
        setGuideExpanded: this.setGuideExpanded,
        beginTutorial: this.beginTutorial,
        physicsPaused: this.props.physicsPaused,
      };
      content = this.props.physics
        ? <PhysicsVariant {...contentProps} />
        : <Fallback {...contentProps} />;
    }

    const fontTestStyles = { visibility: 'hidden' };
    if (!this.state.fallbackFontSize) { fontTestStyles.fontFamily = 'Sans Serif'; }

    const informationPanel = !this.state.guideExpanded
      ? null
      : (
        <GuideDetail
          selected={this.state.guideStep}
          changeStep={this.setGuideStep}
          radius={this.state.guidePosition.r}
        />
      );

    return (
      <div className="ConditionExplorer">
        {informationPanel}
        <svg
          ref={this.svgRef}
          width="100%"
          height="100%"
          style={{ border: '1px solid #000', zIndex: '0' }}
        >
          <g className="keyword color0 textVisible">
            <text ref={this.fontChangeRef} style={fontTestStyles}>
              abcdefghijklmnopqrstuvwxyz
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              -.,
              0123456789
              ÙÛÜŸ€ÀÂÆÇÉÈÊËÏÎÔŒ
              ùûüÿ€àâæçéèêëïîôœ
            </text>
            <text ref={this.textSizeRef} style={fontTestStyles} />
          </g>
          {content}
        </svg>
      </div>
    );
  }
}
