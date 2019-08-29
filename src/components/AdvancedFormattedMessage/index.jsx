import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export default class AdvancedFormattedMessage extends React.PureComponent {
  static propTypes = {
    tag: PropTypes.oneOfType([
      PropTypes.elementType,
      PropTypes.string,
    ]),
    values: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    id: PropTypes.string.isRequired,
  };

  static defaultProps = {
    tag: 'span',
    values: undefined,
  };

  processMessage = (...children) => {
    const { tag, ...props } = this.props;
    return React.createElement(tag, props, ...children);
  }

  render() {
    return (
      <FormattedMessage
        id={this.props.id}
        values={this.props.values}
        key={Math.random() /* Needs a random key to force a render when props change */}
      >
        {this.processMessage}
      </FormattedMessage>
    );
  }
}
