import React from 'react';
import Guide from '../Guide';

const noop = () => {};

class LoadingGuide extends React.PureComponent {
  constructor() {
    super();

    this.state = { step: 0 };
  }

  componentDidMount() { this.setTimeout(); }

  componentDidUpdate() { this.setTimeout(); }

  componentWillUnmount() {
    if (this.timeout) { clearTimeout(this.timeout); }
  }

  setTimeout = () => { this.timeout = setTimeout(this.incrementStep, 500); }

  incrementStep = () => {
    this.setState(prevState => ({ step: prevState.step + 1 }));
  };

  render() {
    const guideStep = (this.state.step % 7) + 1;
    this.timeout = setTimeout(this.incrementStep, 500);

    return <Guide className="LoadingGuide" loading step={guideStep} onClick={noop} />;
  }
}

export default LoadingGuide;
