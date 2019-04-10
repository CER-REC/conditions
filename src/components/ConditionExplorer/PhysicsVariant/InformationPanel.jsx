import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import CircleContainer from '../../CircleContainer';
import Icon from '../../Icon';
import '../styles.scss';

library.add(
  faAngleRight,
  faAngleLeft,
);

const panelText = [
  'information text for the guide 1',
  'information text for the guide 2',
  'information text for the guide 3',
  'information text for the guide 4',
  'information text for the guide 5',
];

const panelHeader = [
  'Header Text 1',
  'Header Text 2',
  'Header Text 3',
  'Header Text 4',
  'Header Text 5',
];

const InformationPanel = (props) => {
  let { selected } = props;
  const previousIcon = 'angle-left';
  const nextIcon = 'angle-right';
  const circles = panelText.map((element, index) => {
    const item = selected === index
      ? <CircleContainer key={index.toString()} size={10} className="gray" />
      : <CircleContainer key={index.toString()} size={10} className="lightgrey" />;
    return item;
  });
  const selectedText = panelText[selected];
  const selectedHeader = panelHeader[selected];
  const { offset } = props;
  return (
    <section
      className="InformationPanel"
      style={{
        background: 'transparent',
        width: '500px',
        position: 'relative',
        left: offset,
        zIndex: '1',
        marginBottom: '-500px',
        height: '500px',
        borderRadius: '50%',
      }}
    >
      <h1 style={{ fontSize: '55px', fontWeight: 700, color: 'white', paddingTop: '100px' }}>
        {selectedHeader}
      </h1>
      <p style={{ fontSize: '20px', fontWeight: 300, color: 'white', fontFamily: 'FiraSansCondensedLight' }}>
        {selectedText}
      </p>
      <CircleContainer size={24} onClick={() => { selected += 1; }} className="arrowPrevious">
        <Icon size="1x" icon={previousIcon} />
      </CircleContainer>
      {circles}
      <CircleContainer size={24} onClick={() => { selected -= 1; }} className="arrowNext">
        <Icon size="1x" icon={nextIcon} />
      </CircleContainer>
    </section>
  );
};

InformationPanel.propTypes = {
  selected: PropTypes.number.isRequired,
  // onChange: PropTypes.func.isRequired,
  // className: PropTypes.string,
};

export default InformationPanel;
