import addons, { makeDecorator } from '@storybook/addons';
import Events from '@storybook/core-events';

let dataStore;

function resetData() {
  dataStore = {
    state: {},
    actions: {},
    logs: [],
  };
}
resetData();

const defaultOptions = {};

function addFeedback(storyFn, context, options) {
  Object.assign(dataStore.state, {
    ...(options.state || {}),
    ...(dataStore.state || {}),
  });
  dataStore.actions = options.actions || {};

  return storyFn(context);
}

export default makeDecorator({
  name: 'withFeedback',
  parameterName: 'feedback',
  allowDeprecatedUsage: false,
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { options, parameters }) => {
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      ...parameters,
    };
    return addFeedback(getStory, context, mergedOptions);
  },
});

export const getProps = () => {
  const actions = Object.entries(dataStore.actions)
    .reduce((acc, next) => {
      acc[next[0]] = (...args) => {
        const result = next[1](dataStore.state)(...args);
        Object.assign(dataStore, {
          state: result,
          logs: dataStore.logs.concat({
            name: next[0],
            args,
            result: JSON.parse(JSON.stringify(result)),
          }),
        });
        addons.getChannel().emit(Events.FORCE_RE_RENDER);
      };
      return acc;
    }, {});

  return {
    ...dataStore.state,
    ...actions,
  };
};
