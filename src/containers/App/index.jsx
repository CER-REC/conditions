import React from 'react';
import LoadingGuide from '../../components/LoadingGuide';

const LazyApp = React.lazy(() => import('./lazy'));
/*
const LazyApp = React.lazy(() => new Promise((res) => {
  setTimeout(() => res(import('./lazy')), 5000);
}));
*/

export default () => (
  <React.Suspense fallback={<div className="App"><LoadingGuide /></div>}>
    <LazyApp />
  </React.Suspense>
);
