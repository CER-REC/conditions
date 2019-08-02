import React from 'react';
import PropTypes from 'prop-types';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

import './styles.scss';

class ContentBlock extends React.PureComponent {
  render() {
    return (
      <div className="ContentBlock">
        <AdvancedFormattedMessage
          id={this.props.id}
          className="contentHeading"
        />: {this.props.content}
      </div>
    );
  }
}

ContentBlock.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default ContentBlock;
