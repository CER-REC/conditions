import React from 'react';
import Guide from '../Guide';
import './styles.scss';

const noop = () => {};

class LoadingGuide extends React.PureComponent {
  constructor() {
    super();
    this.state = { step: 0 };
  }

  componentDidMount() { this.setTimeout(); }

  componentDidUpdate() { this.setTimeout(); }

  componentWillUnmount() { clearTimeout(this.timeout); }

  setTimeout = () => { this.timeout = setTimeout(this.incrementStep, 500); }

  incrementStep = () => this.setState(({ step }) => ({ step: (step + 1) % 7 }));

  render() {
    const guideStep = (this.state.step % 7) + 1;
    return (
      <div className="LoadingGuide">
        <Guide loading step={guideStep} onClick={noop} />
      </div>
    );
  }
}

export default LoadingGuide;
