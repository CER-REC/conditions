import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import Icon from '../Icon';

// should handle url shortening

class MainInfoBar extends React.PureComponent {
  textLinks() {
    return (
      <div className="Text-link">
        <button className="Button">About</button>
        <button className="Button">Methodology</button>
        <button className="Button">Download</button>
      </div>
    )
  }

  // include logic to handle whether we should the double up arrows

  render() {
    return (
      <div className="Main-info-bar">
        <hr />
        {this.textLinks()}
        <Icon />
        <Icon />
        <Icon />
        <Icon />
      </div>
    );
  }
}

export default MainInfoBar;
