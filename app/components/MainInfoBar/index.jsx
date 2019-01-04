import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import Icon from '../Icon';

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

  // arrows() {
  //   return (
  //     <img 
  //       src={}
  //       alt="upward double arrows"
  //     />
  //   );
  // }

  render() {
    return (
      <div className="Main-info-bar">
        <hr />
        {this.textLinks()}
        {/* {this.arrows()} */}
        <Icon />
        <Icon />
        <Icon />
        <Icon />
      </div>
    );
  }
}

export default MainInfoBar;
