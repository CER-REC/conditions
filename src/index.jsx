import React from 'react';
import ReactDOM from 'react-dom';
import DomReady from 'domready';
import './styles.scss'; // Import this before any components to ensure CSS ordering works
import App from './containers/App';

function areScrollbarsVisible() {
  const scrollableElem = document.createElement('div');
  const innerElem = document.createElement('div');
  scrollableElem.style.width = '30px';
  scrollableElem.style.height = '30px';
  scrollableElem.style.overflow = 'scroll';
  scrollableElem.style.borderWidth = '0';
  innerElem.style.width = '30px';
  innerElem.style.height = '60px';
  scrollableElem.appendChild(innerElem);
  document.body.appendChild(scrollableElem); // Elements only have width if they're in the layout
  const diff = scrollableElem.offsetWidth - scrollableElem.clientWidth;
  document.body.removeChild(scrollableElem);
  return diff > 0;
}

DomReady(() => {
  console.log("LOOK HERE");
  console.log(areScrollbarsVisible());
  if (!areScrollbarsVisible()) {
    document.body.classList.add('force-show-scrollbars');
  }
  ReactDOM.render(
    <div className="visualization"><App /></div>,
    document.getElementById('reactRoot'),
  );
});

