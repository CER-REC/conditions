import React from 'react';
import PropTypes from 'prop-types';

export default class Panel extends React.PureComponent {
  static propTypes = {
    channel: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { state: {}, logs: [] };
    // TODO: Add babel for generating actual plugin files
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const { channel, api } = this.props;
    channel.on('addon:state-reducer:update', this.update);
    this.stopListeningOnStory = api.onStory(() => {
      this.setState({ state: {}, logs: [] });
      // TODO: Is this happening in two places?
      channel.emit('addon:state-reducer:reset');
    });
  }

  componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener('addon:state-reducer:update', this.update);
    this.stopListeningOnStory();
  }

  update() {
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
      </div>
    );
  }
}
