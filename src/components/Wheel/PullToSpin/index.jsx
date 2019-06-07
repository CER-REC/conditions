import React, { useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import './styles.scss';
import PropTypes from 'prop-types';
import { useSpring, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import handleInteraction from '../../../utilities/handleInteraction';

const PullToSpin = (props) => {
  const [triggered, set] = useState(false);
  const { intl } = props;

  const getPosition = (x) => {
    if (x > 56) return { x: 56, y: -56, rot: 15 };
    if (x < 0) return { x: 0, y: 0, rot: 0 };
    return { x, y: -x, rot: (x / 56) * 15 };
  };
  const onSpinClick = () => {
    set(state => !state);
    props.onClickSpin();
  };
  const [bind, { delta, down }] = useGesture({
    onUp: () => { onSpinClick(); },

  });

  const { x } = useSpring({
    x: down ? delta[0] : 0,
    config: { tension: 350, friction: 27, easing: 'easeInOutQuart' },
  });

  const { transform } = useSpring({
    transform: triggered ? 'translate(56, -56) rotate(15)' : 'translate(0, 0) rotate(0)',
    config: { tension: 350, friction: 27, easing: 'easeInOutQuart' },
    onRest: () => { set(false); if (triggered) props.onClickSpin(); },
  });

  const dragAnim = interpolate([x], (x1) => { const position = getPosition(x1); return (`translate(${position.x}, ${position.y}) rotate(${position.rot})`); });
  return (
    <g className="PullToSpin">
      <g className="PullSpinArrow">
        <path id="ArrowLine" className="ArrowLine" d="M312.82,2.1c33.41,15.77,62.69,37.61,85.51,65.32" />
        <path d="M390.13,65.41a.5.5,0,0,1,.63-.34l7.39,2.2L397,59.64a.5.5,0,0,1,1-.15l1.24,8.41a.5.5,0,0,1-.64.56L390.47,66a.5.5,0,0,1-.34-.63Z" />
      </g>
      <g className="PullMessage">
        <text x="376" y="10" className="small">
          <tspan dx="-10">{intl.formatMessage({ id: 'components.companyWheel.pullToSpin.pull' })}</tspan>
          <tspan dx="-20" dy="10">{intl.formatMessage({ id: 'components.companyWheel.pullToSpin.toSpin' })}</tspan>
        </text>
      </g>
      <g role="button" className="PullSlider" {...handleInteraction(onSpinClick)}>
        <animated.g {...bind()} transform={dragAnim} className="PullAnimatedGroup">
          <defs>
            <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" x="2" width="2.2" height="5" patternTransform="rotate(90)">
              <rect width="13.52px" height="33.12px" x="328.33" y="-2.22" transform="translate(159.71, 300.23) rotate(-60.92)" />
              <line x1="0" y="0" x2="0" y2="5" className="diagonalHatch" />
            </pattern>
          </defs>
          <image
            width="48px"
            height="40px"
            className="PullSpinSvgShadow"
            transform="translate(311.5, -4.5)"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAACXBIWXMAAAsSAAALEgHS3X78AAAFbUlEQVRYR9WYeYydYxTGn+nUtKVoVVFqT22xK4laglhCgog9lpQgiIjiDyI0SJCSRiIisaRBSkRiiSUlISItsfyBWCKWxF5CbVW1dTw/5/3mfve7373fna9zp/XHLzNz553vnuec85zz3tHg4KD+z1QeaPkDqS9P1fleU3ngv0ONgPvN2AL9a1JM9YFG4ANmgploNkxMTK8NpDNjRltI519GQGR5fAp4U7OV2T7B95uZyWa9nJBRE9Ep+L4UPBmeYrYxe5gDzOGJg8zeZobZ3ExK59fRKFWjU/BkcnwKnmzPMieY88zl5gpzoTndHGlmpnObmPXNOEUCeiqknQDelHagbbZVZP0Mc425wzxoFpq7zS3msiTkULOborU2UnNb9URIWfBZ6/DmtMU+5mRznbnfPG9eM2+axeYZs8DcZC42xyuqtZPZQq3+GFEhZQJ4A8pPBnc0RykyfI950bxvvjTfmM/Sz0vME+ZOc7WZbY42+5kd2ggZERHF4Mk+BqSHaYNZKZjbzLPmPfOt+dWsSF+/Vwh5RyHwITPfXGnOUiQgEzLiRi8G358ejhHpZdqBjNLvbygyT9B/mr/NX2al+UUh7ON07jnzgEI4ZkdIT4xeFJAZdzuFIS9StMULKbgfzR/mH7MqwfcIWpF+/5X5UOGTRQoht5o56oHR8wKy7LOs9jSnmBvNY+ZtRYYJkswT+GCOVel1xC03yxTVyoTQfsMxetci8tmnlFwNyMyB5gJzl3nJfGp+VmS6GHxeBNUoE/KBqo1eyx9FAbQPPcqWZVkx7+npr81vKs9+N0J+UGej1/ZHNwJeV/T1cnUnoCikyuhV/qAabduqXQuxeWmhzMAfKbL4ewooM3GViLyQdkYv88f+iraaZjZQVKNUROObVhOfZOaah82r5hPFzKcStAbVGK6QbvxxlTnbHKG4PE5XdEapiLyA/Bjl/sNN8xxzs3nEvKzGFl6mekK68Qc7Z565RFENbruIoBK0U0cBWRU2VlwjDjPnmhvMfYpyU3bKXyakGxF5IWX+4PlPKarBEjxW4Qs6g9j6SwUUvIB5mAaIONicqrgPYTiMt0gNIfQzfU1/0+fdViMvJPMHCfncvGWeNreb8xVjfWvFdCK+vlIBSQRji1IhgkqwlbmRMurOVGSFKwJCmCRMFDJHBskkGa1j9Kyt2DeIIEGMWzzBviCZLLymNioTQBWyj5KUjOXCkmEqsHS4nDG7meHz05vQu/QwvUxP1/UH55l036XncQuYq2ijnRWjFZ+2F1DiCf6AaqCetZ8JISuzFVuVfmWKME2YKnWNzplMANeXRxUfoo5RtxVoU40yIdxjuM8wKZjfzPEFqm90Xqf1uO3SQq8oBgfT6BDFZKz2wDCEUE6WHhOCDcomZaPWNTqv4R92DVXkkx7jlI+yeJCltq46TaEq1OwPFgsZYVpx/eAug9Hxx3CNnk0ifoePaEWqOSc9k7al8k39P2wBJULoxzpGzzb6yhR4ttSWKnr/cUVLUtWZ6dlUvf0mroNWz+hfKIT8pGivpel1/mnAfz74MEVrUt1J6T3GtMRQFWQVqm907lfvKi6KQOa5OGJcKsfo3FXRohNUdZlbXdoIaWf0eUkIFcEjZP1Jc6+5VrH5qeCWCp+13IFGXECJkE5GZ7Jcaq5XmB2fUB3Mf5qiatwAJqdntLROzwSUCCkafUYSQkWOU3z2JugTFebfVzHzp6hD6/RcQEFI0R/TUoZ3Udz59zK7K8w/PZ0h+KaltUYE5ETk/cFC4n6PR6YqWmxqCpxPhUOfhyufXXVgJElCsoqMTWLG5RjIAq/K/NAzqw70ipyYrDpDP1f9bdNzqg6s7VQeWNv5F+ia5qxCNZc7AAAAAElFTkSuQmCC"
          />
          <rect className="" width="13.52px" height="33.12px" x="328.33" y="-2.22" rx="2" ry="2" fill="white" opacity="1" transform="translate(159.71, 300.23) rotate(-60.92)" />
          <rect className="PullSpinRect" width="13.52px" height="33.12px" x="328.33" y="-2.22" rx="2" ry="2" fill="url(#diagonalHatch)" transform="translate(159.71, 300.23) rotate(-60.92)" />
        </animated.g>
      </g>
    </g>
  );
};

PullToSpin.propTypes = {
  onClickSpin: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PullToSpin);
