import React from 'react';
import Guide from '../Guide';
import './styles.scss';

const noop = () => {};

class LoadingGuide extends React.PureComponent {
  constructor() {
    super();
    this.state = { step: 0, visible: true };
  }

  componentDidMount() {
    this.setTimeout();
    if (window) {
      window.addEventListener('LoadingGuide.enabled', this.captureEvent, false);
    }
  }

  componentDidUpdate() { this.setTimeout(); }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    if (window) {
      window.removeEventListener('LoadingGuide.enabled', this.captureEvent, false);
    }
  }

  captureEvent = e => this.setState({ visible: e.detail }, this.setTimeout);

  setTimeout = () => {
    if (!this.state.visible) { return; }
    this.timeout = setTimeout(this.incrementStep, 500);
  }

  incrementStep = () => this.setState(({ step }) => ({ step: (step + 1) % 7 }));

  render() {
    if (!this.state.visible) { return null; }
    const guideStep = (this.state.step % 7) + 1;
    return (
      <div className="LoadingGuide">
        <Guide loading step={guideStep} onClick={noop} />
      </div>
    );
  }
}

export default LoadingGuide;
