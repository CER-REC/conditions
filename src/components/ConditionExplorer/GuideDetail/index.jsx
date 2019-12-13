import React from 'react';
import PropTypes from 'prop-types';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import CircleContainer from '../../CircleContainer';
import List from '../../List';
import './styles.scss';

import english from '../../../languages/english.json';

const stepContent = step => (
  <>
    <AdvancedFormattedMessage
      id={`components.conditionExplorer.guide.pages.${step}.title`}
      tag="h1"
    />
    <AdvancedFormattedMessage
      id={`components.conditionExplorer.guide.pages.${step}.overview`}
      tag="p"
    />
  </>
);

// eslint-disable-next-line react/prop-types
const GuideDetailOutsideText = React.memo(({ children, radius, textRadius }) => (
  <svg
    className="curvedText"
    width={radius}
    height={radius / 2}
    viewBox={`0 ${radius / 2} ${radius} ${radius / 2}`}
  >
    <defs>
      <path
        id="guideDetailText"
        d={`
          M 0,${textRadius}
          A ${textRadius} ${textRadius} 0 0 0 ${textRadius},0
          Z
        `}
      />
    </defs>
    <text>
      <textPath
        href="#guideDetailText"
        startOffset="3%"
      >
        {children}
      </textPath>
    </text>
  </svg>
));

const GuideDetail = (props) => {
  const { changeStep, selected, radius } = props;

  const circles = english.components.conditionExplorer.guide.pages.map((_, index) => (
    <CircleContainer
      key={index /* eslint-disable-line react/no-array-index-key */}
      size={8}
    >
      &nbsp;
    </CircleContainer>
  ));

  const textRadius = radius - 4;

  return (
    <section className="GuideDetail" style={{ width: radius * 2, height: radius * 2 }}>
      <div className="step-text">{stepContent(selected)}</div>
      <div className="step-controls">
        <List
          selected={selected}
          arrowsAtEdges
          arrowSize={16}
          horizontal
          onChange={changeStep}
          items={circles}
        />
      </div>
      <AdvancedFormattedMessage
        id="components.conditionExplorer.guide.clickOutside"
        tag={GuideDetailOutsideText}
        textRadius={textRadius}
        radius={radius}
      />
    </section>
  );
};

GuideDetail.propTypes = {
  selected: PropTypes.number.isRequired,
  changeStep: PropTypes.func.isRequired,
  radius: PropTypes.number.isRequired,
};

GuideDetail.defaultProps = {};

export default React.memo(GuideDetail);
