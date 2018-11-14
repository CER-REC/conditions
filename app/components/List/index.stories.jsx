import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import List from './';
import ReadMe from './README.md';

storiesForComponent('Components|List', module, ReadMe)
    .add('default', () => (
        <List
            items={['Item 1', 'Item 2', 'Item 3']}
            onChange={(v) => alert(v)}
        />
    ));
