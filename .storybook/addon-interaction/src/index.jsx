import addons, { makeDecorator } from '@storybook/addons';
import Store from './Store';

export default makeDecorator({
  name: 'withInteraction',
  parameterName: 'interaction',
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
        const stateResult = (typeof result === 'object' && !Array.isArray(result))
          ? result
          : undefined;
        // stateResult is either the changed state or undefined
        if (stateResult) { Store.updateData(stateResult); }
        Store.addLog(next[0], args, stateResult);
      };
      return acc;
    }, {});

  return {
    ...Store.data,
    ...actions,
  };
};
