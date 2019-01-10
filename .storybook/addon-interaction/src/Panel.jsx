import React from 'react';
import PropTypes from 'prop-types';

export default class Panel extends React.PureComponent {
  static propTypes = {
    channel: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      actions: [],
      logs: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { channel, api } = this.props;
    channel.on('addon:interaction:update', this.update);
    channel.on('addon:interaction:loading', this.markLoading);
    this.stopListeningOnStory = api.onStory(() => {
      channel.emit('addon:interaction:reset', true);
    });
  }

  componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener('addon:interaction:update', this.update);
    channel.removeListener('addon:interaction:loading', this.markLoading);
    this.stopListeningOnStory();
  }

  update = data => this.setState({ ...data, loading: false });

  markLoading = () => this.setState({ loading: true });

  render() {
    if (!this.props.active) { return null; }
    if (this.state.loading) { return 'Loading...'; }
    const { data, logs, actions } = this.state;
    if (!Object.keys(data).length && !logs.length && !actions.length) {
      return 'No interactions';
    }
    return (
      <div>
        <h3>State</h3>
        <pre>{JSON.stringify(this.state.data, null, '  ')}</pre>
        <h3>Logs</h3>
        <pre>{JSON.stringify(this.state.logs, null, '  ')}</pre>
        <h3>Actions</h3>
        <pre>{JSON.stringify(this.state.actions, null, '  ')}</pre>
      </div>
    );
  }
}
