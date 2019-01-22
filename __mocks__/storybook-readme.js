import React from 'react';

export const doc = () => () => React.createElement('div');
export const withDocs = () => (storyFn, context) => storyFn(context);
export const withReadme = () => (storyFn, context) => storyFn(context);
