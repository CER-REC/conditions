import addons, { makeDecorator } from '@storybook/addons';
import Store from './Store';

export default makeDecorator({
  name: 'withFeedback',
  parameterName: 'feedback',
  allowDeprecatedUsage: false,
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { options = {}, parameters = {} }) => {
    Store.setChannel(addons.getChannel());
    Store.updateData({
      ...(options.state || {}),
      ...(parameters.state || {}),
      ...(Store.data || {}),
    });
    Store.setActions({
      ...(options.actions || {}),
      ...(parameters.actions || {}),
    });

    return getStory(context);
  },
});

export const getProps = () => {
  const actions = Object.entries(Store.actions)
    .reduce((acc, next) => {
      acc[next[0]] = (...args) => {
        const result = next[1](Store.data)(...args);
        Store.updateData(result);
        Store.addLog(next[0], args, result);
      };
      return acc;
    }, {});

  return {
    ...Store.data,
    ...actions,
  };
};
