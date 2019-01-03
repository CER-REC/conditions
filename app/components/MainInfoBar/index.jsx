import React from 'react';
import PropTypes from 'prop-types';
import DoubleUpArrows from './images/double-up-arrows.svg';

import './styles.scss';

class MainInfoBar extends React.PureComponent {
  horizontalBar() {
    return (
      <hr />
    );
  }

  textLinks() {
    return (
      <div className="text-link">
        <button>About</button>
        <button>Methodology</button>
        <button>Download</button>
      </div>
    )
  }

  arrows() {
    return (
      <img 
        src={DoubleUpArrows}
        alt="upward double arrows"
      />
    );
  }

  render() {
    return (
      <div className="main-info-bar">
        {this.horizontalBar()}
        {this.textLinks()}
        {this.arrows()}
      </div>
    );
  }
}

export default MainInfoBar;
