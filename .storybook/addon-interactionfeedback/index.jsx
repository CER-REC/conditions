import React from 'react';
import { makeDecorator } from '@storybook/addons';
import Feedback from './Feedback';
import './styles.scss';

const defaultOptions = {};

function addFeedback(storyFn, context, providedOptions) {
  const props = {
    ...defaultOptions,
    ...providedOptions,
    storyFn,
    context,
  };
  return (
    <Feedback {...props} />
  );
}

const optionToObject = (val = {}) => (typeof val === 'string' ? { name: val } : val);

export default makeDecorator({
  name: 'withFeedback',
  parameterName: 'feedback',
  allowDeprecatedUsage: false,
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { options, parameters }) => {
    const optionsObj = optionToObject(options);
    const parametersObj = optionToObject(parameters);
    if (optionsObj.name && parametersObj.name) { return getStory(context); }
    const mergedOptions = { ...optionsObj, ...parametersObj };
    return addFeedback(getStory, context, mergedOptions);
  },
})

