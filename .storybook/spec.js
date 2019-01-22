import initStoryshots from '@storybook/addon-storyshots';

jest.doMock('./addon-status', () => {
  return jest.fn((storyFnOuter, contextOuter) => {
    if (typeof storyFnOuter === 'function') { return storyFnOuter(contextOuter); }
    return (storyFn, context) => storyFn(context);
  });
});

initStoryshots({
  storyKindRegex: /^Components/,
});
