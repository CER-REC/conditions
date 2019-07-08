import React from 'react';
import Guide from '../Guide';

const noop = () => {};

class LoadingGuide extends React.PureComponent {
  constructor() {
    super();

    this.state = { step: 0 };
  }

<<<<<<< HEAD
  componentDidMount() { this.setTimeout(); }

  componentDidUpdate() { this.setTimeout(); }

=======
>>>>>>> bc69725f58d8b245e2928d36c727b1e0077576f3
  componentWillUnmount() {
    if (this.timeout) { clearTimeout(this.timeout); }
  }

<<<<<<< HEAD
  setTimeout = () => { this.timeout = setTimeout(this.incrementStep, 500); }

=======
>>>>>>> bc69725f58d8b245e2928d36c727b1e0077576f3
  incrementStep = () => {
    this.setState(prevState => ({ step: prevState.step + 1 }));
  };

  render() {
    const guideStep = (this.state.step % 7) + 1;
<<<<<<< HEAD
=======
    this.timeout = setTimeout(this.incrementStep, 500);
>>>>>>> bc69725f58d8b245e2928d36c727b1e0077576f3
    return <Guide className="LoadingGuide" loading step={guideStep} onClick={noop} />;
  }
}

export default LoadingGuide;
