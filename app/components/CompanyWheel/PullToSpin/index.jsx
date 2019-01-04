import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';
import handleInteraction from '../../../utilities/handleInteraction';

class PullToSpin extends React.Component {
  state = {
    spinTogglePosition: 'translate(0px, 0px) rotate(0deg)',
  }

  onSpinClick = () => {
    this.setState({ spinTogglePosition: 'translate(56px, -56px) rotate(15deg)' });
    this.props.onSpinClick();
  }

  onRestSpin = () => {
    this.setState({ spinTogglePosition: 'translate(0px, 0px) rotate(0deg)' });
  }

  render() {
    return (
      <svg className="PullToSpin" xmlns="http://www.w3.org/2000/svg" viewBox="310 -5 110 80">
        <g className="PullSpinArrow">
          <path id="ArrowLine" className="ArrowLine" d="M312.82,2.1c33.41,15.77,62.69,37.61,85.51,65.32" />
          <path d="M390.13,65.41a.5.5,0,0,1,.63-.34l7.39,2.2L397,59.64a.5.5,0,0,1,1-.15l1.24,8.41a.5.5,0,0,1-.64.56L390.47,66a.5.5,0,0,1-.34-.63Z" />
        </g>
        <g className="PullMessage">
          <path d="M397.2,17.9c0.4,0.4,0.7,0.9,0.7,1.6s-0.2,1.3-0.7,1.7c-0.4,0.4-1.1,0.5-1.8,0.5h-0.7v2.5h-0.9v-6.9h1.6    C396.1,17.4,396.7,17.6,397.2,17.9z M396.5,20.7c0.3-0.2,0.4-0.6,0.4-1.1s-0.1-0.9-0.4-1.1s-0.6-0.3-1.2-0.3h-0.6V21h0.6    C395.8,21,396.2,20.9,396.5,20.7z" />
          <path d="M402.3,24.3h-0.8l-0.1-0.8c-0.4,0.6-0.9,0.9-1.5,0.9c-0.4,0-0.8-0.1-1-0.4s-0.4-0.6-0.4-1.1V19h0.9v3.8    c0,0.3,0.1,0.5,0.2,0.7c0.1,0.1,0.3,0.2,0.5,0.2c0.4,0,0.8-0.3,1.2-0.9V19h0.9L402.3,24.3L402.3,24.3z" />
          <path d="M404.1,24.1c-0.2-0.2-0.3-0.5-0.3-0.8v-6.4l0.9-0.1v6.5c0,0.3,0.1,0.4,0.3,0.4c0.1,0,0.2,0,0.3-0.1    l0.2,0.6c-0.2,0.1-0.4,0.2-0.7,0.2C404.6,24.4,404.3,24.3,404.1,24.1z" />
          <path d="M406.8,24.1c-0.2-0.2-0.3-0.5-0.3-0.8v-6.4l0.9-0.1v6.5c0,0.3,0.1,0.4,0.3,0.4c0.1,0,0.2,0,0.3-0.1    l0.2,0.6c-0.2,0.1-0.4,0.2-0.7,0.2C407.2,24.4,406.9,24.3,406.8,24.1z" />
          <path d="M391.1,32.9c-0.3,0.2-0.7,0.4-1.1,0.4s-0.8-0.1-1-0.4c-0.2-0.2-0.3-0.6-0.3-1v-3.3h-0.8v-0.7h0.8v-1.2    l0.9-0.1v1.3h1.2l-0.1,0.7h-1.1v3.3c0,0.5,0.2,0.7,0.6,0.7c0.1,0,0.2,0,0.3-0.1c0.1,0,0.2-0.1,0.3-0.1L391.1,32.9z" />
          <path d="M395.1,28.4c0.4,0.5,0.6,1.2,0.6,2c0,0.9-0.2,1.5-0.6,2c-0.4,0.5-0.9,0.7-1.6,0.7s-1.2-0.2-1.6-0.7    s-0.6-1.2-0.6-2c0-0.9,0.2-1.6,0.6-2s0.9-0.7,1.6-0.7S394.7,27.9,395.1,28.4z M392.6,28.9c-0.2,0.3-0.3,0.8-0.3,1.5    c0,1.4,0.4,2,1.2,2s1.2-0.7,1.2-2.1c0-0.7-0.1-1.2-0.3-1.5c-0.2-0.3-0.5-0.5-0.9-0.5S392.9,28.6,392.6,28.9z" />
          <path d="M402.1,26.3c0.3,0.1,0.6,0.3,0.9,0.6l-0.5,0.5c-0.2-0.2-0.5-0.3-0.7-0.4s-0.5-0.1-0.7-0.1    c-0.3,0-0.6,0.1-0.8,0.3c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.2,0,0.4,0.1,0.5s0.2,0.3,0.4,0.4c0.2,0.1,0.5,0.2,0.8,0.4    c0.4,0.1,0.7,0.3,1,0.5s0.5,0.4,0.6,0.6c0.1,0.3,0.2,0.6,0.2,1s-0.1,0.7-0.3,1.1c-0.2,0.3-0.4,0.6-0.8,0.7    c-0.3,0.2-0.7,0.3-1.2,0.3c-0.8,0-1.5-0.3-2.1-0.9l0.5-0.5c0.2,0.2,0.5,0.4,0.8,0.5s0.5,0.2,0.9,0.2s0.7-0.1,0.9-0.3    c0.2-0.2,0.4-0.5,0.4-0.9c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.5-0.4-1-0.6c-0.6-0.2-1.1-0.5-1.4-0.8s-0.4-0.7-0.4-1.2    c0-0.3,0.1-0.6,0.3-0.9c0.2-0.3,0.4-0.5,0.7-0.6s0.7-0.2,1-0.2C401.4,26.1,401.8,26.2,402.1,26.3z" />
          <path d="M407.9,28.4c0.3,0.5,0.4,1.2,0.4,2c0,0.9-0.2,1.5-0.5,2c-0.3,0.5-0.8,0.8-1.4,0.8c-0.5,0-0.9-0.2-1.3-0.6    v2.5l-0.9,0.1v-7.4h0.8v0.7c0.4-0.6,0.8-0.8,1.4-0.8C407.1,27.7,407.6,27.9,407.9,28.4z M407.3,30.5c0-0.7-0.1-1.2-0.3-1.6    c-0.2-0.3-0.4-0.5-0.8-0.5c-0.2,0-0.4,0.1-0.6,0.2s-0.3,0.3-0.5,0.6v2.7c0.3,0.4,0.6,0.7,1,0.7C407,32.5,407.3,31.8,407.3,30.5z" />
          <path d="M410.5,25.5c0.1,0.1,0.2,0.3,0.2,0.4s-0.1,0.3-0.2,0.4s-0.3,0.2-0.4,0.2c-0.2,0-0.3-0.1-0.4-0.2    s-0.2-0.2-0.2-0.4s0.1-0.3,0.2-0.4s0.3-0.2,0.4-0.2C410.2,25.4,410.4,25.4,410.5,25.5z M410.5,27.8v5.3h-0.9v-5.3H410.5z" />
          <path d="M415.5,28.1c0.2,0.3,0.4,0.7,0.4,1.1V33H415v-3.7c0-0.3-0.1-0.6-0.2-0.7s-0.3-0.2-0.5-0.2    c-0.4,0-0.8,0.3-1.2,0.9V33h-0.9v-5.3h0.8l0.1,0.8c0.4-0.6,0.9-0.9,1.5-0.9C414.9,27.7,415.2,27.9,415.5,28.1z" />
        </g>
        <g role="button" className="PullSlider" {...handleInteraction(this.onSpinClick)}>
          <Spring
            to={{ transform: this.state.spinTogglePosition }}
            onRest={this.onRestSpin}
            config={{ tension: 350, friction: 27, easing: 'easeInOutQuart' }}
          >
            {props => (
              <animated.g style={props} className="PullAnimatedGroup">
                <image className="PullSpinSvgShadow" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAACXBIWXMAAAsSAAALEgHS3X78AAAFbUlEQVRYR9WYeYydYxTGn+nUtKVoVVFqT22xK4laglhCgog9lpQgiIjiDyI0SJCSRiIisaRBSkRiiSUlISItsfyBWCKWxF5CbVW1dTw/5/3mfve7373fna9zp/XHLzNz553vnuec85zz3tHg4KD+z1QeaPkDqS9P1fleU3ngv0ONgPvN2AL9a1JM9YFG4ANmgploNkxMTK8NpDNjRltI519GQGR5fAp4U7OV2T7B95uZyWa9nJBRE9Ep+L4UPBmeYrYxe5gDzOGJg8zeZobZ3ExK59fRKFWjU/BkcnwKnmzPMieY88zl5gpzoTndHGlmpnObmPXNOEUCeiqknQDelHagbbZVZP0Mc425wzxoFpq7zS3msiTkULOborU2UnNb9URIWfBZ6/DmtMU+5mRznbnfPG9eM2+axeYZs8DcZC42xyuqtZPZQq3+GFEhZQJ4A8pPBnc0RykyfI950bxvvjTfmM/Sz0vME+ZOc7WZbY42+5kd2ggZERHF4Mk+BqSHaYNZKZjbzLPmPfOt+dWsSF+/Vwh5RyHwITPfXGnOUiQgEzLiRi8G358ejhHpZdqBjNLvbygyT9B/mr/NX2al+UUh7ON07jnzgEI4ZkdIT4xeFJAZdzuFIS9StMULKbgfzR/mH7MqwfcIWpF+/5X5UOGTRQoht5o56oHR8wKy7LOs9jSnmBvNY+ZtRYYJkswT+GCOVel1xC03yxTVyoTQfsMxetci8tmnlFwNyMyB5gJzl3nJfGp+VmS6GHxeBNUoE/KBqo1eyx9FAbQPPcqWZVkx7+npr81vKs9+N0J+UGej1/ZHNwJeV/T1cnUnoCikyuhV/qAabduqXQuxeWmhzMAfKbL4ewooM3GViLyQdkYv88f+iraaZjZQVKNUROObVhOfZOaah82r5hPFzKcStAbVGK6QbvxxlTnbHKG4PE5XdEapiLyA/Bjl/sNN8xxzs3nEvKzGFl6mekK68Qc7Z565RFENbruIoBK0U0cBWRU2VlwjDjPnmhvMfYpyU3bKXyakGxF5IWX+4PlPKarBEjxW4Qs6g9j6SwUUvIB5mAaIONicqrgPYTiMt0gNIfQzfU1/0+fdViMvJPMHCfncvGWeNreb8xVjfWvFdCK+vlIBSQRji1IhgkqwlbmRMurOVGSFKwJCmCRMFDJHBskkGa1j9Kyt2DeIIEGMWzzBviCZLLymNioTQBWyj5KUjOXCkmEqsHS4nDG7meHz05vQu/QwvUxP1/UH55l036XncQuYq2ijnRWjFZ+2F1DiCf6AaqCetZ8JISuzFVuVfmWKME2YKnWNzplMANeXRxUfoo5RtxVoU40yIdxjuM8wKZjfzPEFqm90Xqf1uO3SQq8oBgfT6BDFZKz2wDCEUE6WHhOCDcomZaPWNTqv4R92DVXkkx7jlI+yeJCltq46TaEq1OwPFgsZYVpx/eAug9Hxx3CNnk0ifoePaEWqOSc9k7al8k39P2wBJULoxzpGzzb6yhR4ttSWKnr/cUVLUtWZ6dlUvf0mroNWz+hfKIT8pGivpel1/mnAfz74MEVrUt1J6T3GtMRQFWQVqm907lfvKi6KQOa5OGJcKsfo3FXRohNUdZlbXdoIaWf0eUkIFcEjZP1Jc6+5VrH5qeCWCp+13IFGXECJkE5GZ7Jcaq5XmB2fUB3Mf5qiatwAJqdntLROzwSUCCkafUYSQkWOU3z2JugTFebfVzHzp6hD6/RcQEFI0R/TUoZ3Udz59zK7K8w/PZ0h+KaltUYE5ETk/cFC4n6PR6YqWmxqCpxPhUOfhyufXXVgJElCsoqMTWLG5RjIAq/K/NAzqw70ipyYrDpDP1f9bdNzqg6s7VQeWNv5F+ia5qxCNZc7AAAAAElFTkSuQmCC" />
                <rect className="PullSpinRect" x="328.33" y="-2.22" rx="2" ry="2" />
                <g>
                  <line x1="325.77" y1="1.42" x2="319.19" y2="13.24" />
                  <line x1="327.57" y1="2.42" x2="320.99" y2="14.24" />
                  <line x1="329.37" y1="3.42" x2="322.79" y2="15.24" />
                  <line x1="331.17" y1="4.42" x2="324.59" y2="16.24" />
                  <line x1="332.97" y1="5.42" x2="326.39" y2="17.24" />
                  <line x1="334.77" y1="6.42" x2="328.19" y2="18.24" />
                  <line x1="336.57" y1="7.42" x2="329.99" y2="19.24" />
                  <line x1="338.37" y1="8.43" x2="331.79" y2="20.24" />
                  <line x1="340.17" y1="9.43" x2="333.59" y2="21.24" />
                  <line x1="341.97" y1="10.43" x2="335.39" y2="22.25" />
                  <line x1="343.77" y1="11.43" x2="337.19" y2="23.25" />
                  <line x1="345.57" y1="12.43" x2="339" y2="24.25" />
                  <line x1="347.37" y1="13.43" x2="340.8" y2="25.25" />
                  <line x1="349.17" y1="14.43" x2="342.6" y2="26.25" />
                  <line x1="350.97" y1="15.43" x2="344.4" y2="27.25" />
                </g>
              </animated.g>
            )}
          </Spring>
        </g>
      </svg>
    );
  }
}

PullToSpin.propTypes = {
  onSpinClick: PropTypes.func.isRequired,
};

export default PullToSpin;
