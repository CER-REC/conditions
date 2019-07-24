import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CircleContainer from '../../CircleContainer';
import List from '../../List';
import './styles.scss';

const steps = [
  (
    <React.Fragment>
      <FormattedMessage
        id="components.conditionExplorer.guide.overview.title"
        tagName="h1"
      />
      <FormattedMessage id="components.conditionExplorer.guide.overview.overview" tagName="p" />
    </React.Fragment>
  ),
  (
    <React.Fragment>
      <FormattedMessage
        id="components.conditionExplorer.guide.reason.title"
        tagName="h1"
      />
      <FormattedMessage
        id="components.conditionExplorer.guide.reason.overview"
        tagName="p"
      />
    </React.Fragment>
  ),
  (
    <React.Fragment>
      <FormattedMessage
        id="components.conditionExplorer.guide.compliance.title"
        tagName="h1"
      />
      <FormattedMessage
        id="components.conditionExplorer.guide.compliance.documentationPrompt"
      >
        {text => <p>{text}:</p>}
      </FormattedMessage>
      <ul>
        {[1, 2].map(i => (
          <FormattedMessage
            key={i}
            id={`components.conditionExplorer.guide.compliance.doc${i}`}
            tagName="li"
          />
        ))}
      </ul>
    </React.Fragment>
  ),
];

const GuideDetail = (props) => {
  const { changeStep, selected, radius } = props;

  const circles = steps.map((element, index) => (
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
      <div className="step-text">{steps[selected]}</div>
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
      <FormattedMessage id="components.conditionExplorer.guide.clickOutside">
        {text => (
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
                {text}
              </textPath>
            </text>
          </svg>
        )}
      </FormattedMessage>
    </section>
  );
};

GuideDetail.propTypes = {
  selected: PropTypes.number.isRequired,
  changeStep: PropTypes.func.isRequired,
  radius: PropTypes.number.isRequired,
};

GuideDetail.defaultProps = {};

export default GuideDetail;
