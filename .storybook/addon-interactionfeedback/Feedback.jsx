import React from 'react';

export default class Feedback extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      isVisible: false,
    }
  }

  capitalize =(str) => {
    return str.match(/((?:^.|[A-Z])[a-z]+)/g)
      .map(v => `${v.slice(0, 1).toUpperCase()}${v.slice(1)}`)
      .join(' ');
  }

  revertVisibility = () => {
    setTimeout(() => this.setState({isVisible: false}), 1000);
  }

  toggleVisibility = () => {
    this.setState({isVisible: true}, this.revertVisibility);
  }

  render(){
    this.props.context.toggleVisibility = this.toggleVisibility;
    return (
      <React.Fragment>
        <div className={`withFeedback ${this.state.isVisible ? 'visible' : 'hidden'}`}>
              <div className="title">
                {this.capitalize(this.props.name)}
              </div>
              { this.props.note ? <div className="note">{this.props.note}</div> : null }
          </div>
          {this.props.storyFn(this.props.context)}
      </React.Fragment>
    );
  }
}