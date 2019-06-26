import React from 'react';
import Guide from '../Guide';

const noop = () => {};

class LoadingGuide extends React.PureComponent {
  constructor() {
    super();

    this.state = { step: 0 };
  }

  incrementStep = () => {
    this.setState(prevState => ({ step: prevState.step + 1 }));
  };

  render() {
    const guideStep = (this.state.step % 7) + 1;
    setTimeout(this.incrementStep, 500);
    return <Guide loading step={guideStep} onClick={noop} />;
  }
}

export default LoadingGuide;
