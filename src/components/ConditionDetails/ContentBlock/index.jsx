import React from 'react';
import PropTypes from 'prop-types';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

import './styles.scss';

const ContentBlock = props => (
  <div className="ContentBlock">
    <AdvancedFormattedMessage
      id={props.id}
      className="contentHeading"
    />: {props.content}
  </div>
);

ContentBlock.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default React.memo(ContentBlock);
