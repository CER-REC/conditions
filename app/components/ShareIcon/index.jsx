import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import CircleContainer from '../CircleContainer';
import Icon from '../Icon';

class ShareIcon extends React.PureComponent {
  /*
  shortenUrl = () => {
    TODO: shorten URL with bitly
  };

  handleOnClick = () => {
    TODO: make share icon clickable
  }
  */

  render() {
    return (
      <div
        className="ShareIcon"
        {...handleInteraction(this.props.onChange)}
      >
        <CircleContainer size="20px">
          <Icon size="1x" icon={this.props.icon} prefix={this.props.prefix} />
        </CircleContainer>
      </div>
    );
  }
}

ShareIcon.propTypes = {
  className: PropTypes.string,
  prefix: PropTypes.string,
};

ShareIcon.defaultProps = {
  className: '',
  prefix: 'fab',
};

export default ShareIcon;

