import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './styles.scss';

class ContentBlock extends React.PureComponent {
  render() {
    return (
      <div className={`ContentBlock ${(this.props.half ? 'half' : '')}`}>
        <FormattedMessage id={this.props.id}>
          {text => <span className="contentHeading">{text}</span>}
        </FormattedMessage>: {this.props.content}
      </div>
    );
  }
}

ContentBlock.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  half: PropTypes.bool,
};

ContentBlock.defaultProps = {
  half: false,
};

export default ContentBlock;
