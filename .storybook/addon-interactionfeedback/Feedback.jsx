import React from 'react';

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    console.log('constructor');
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, 2000);
  }

  revertVisibility = () => {
    setTimeout(() => this.setState({ isVisible: false }), 1000);
  }

  toggleVisibility = () => {
    this.setState({ isVisible: true }, this.revertVisibility);
  }

  render() {
    // this.props.context.toggleVisibility = this.toggleVisibility;
    return (
      <React.Fragment>
        <div className={`withFeedback ${this.state.isVisible ? 'visible' : 'hidden'}`}>
          <div className="title">
            Test
          </div>
        </div>
        {this.props.children}
      </React.Fragment>
    );
  }
}
