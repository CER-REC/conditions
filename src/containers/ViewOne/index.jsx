import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import { viewOneQuery } from '../../queries/viewOne';

import ConditionExplorer from '../../components/ConditionExplorer';
import ShortcutInfoBar from '../../components/ShortcutInfoBar';
import './styles.scss';

const noop = () => {};

// Fisher-Yates shuffling algorithm:
// https://bost.ocks.org/mike/shuffle/
const shuffleArray = (arr) => {
  const out = [...arr];
  let left = out.length;
  let swap;
  let take;

  while (left) {
    // Pick a remaining element…
    take = Math.floor(Math.random() * left);
    left -= 1;

    // And swap it with the current element.
    swap = out[left];
    out[left] = out[take];
    out[take] = swap;
  }

  return out;
};

const ViewOne = props => (
  <section className={classNames('ViewOne', { layoutOnly: props.layoutOnly })}>
    <section className="introduction">
      <FormattedMessage id="views.view1.header.title" tagName="h1" />
      <FormattedMessage id="views.view1.header.subtitle" />
    </section>
    <section className="explorer">
      <ConditionExplorer
        keywords={props.keywords}
        selectedKeywordId={props.selected.keywordId}
        setSelectedKeyword={props.setSelectedKeyword}
        beginTutorial={props.beginTutorial}
        physicsPaused={props.physicsPaused}
      />
    </section>
    <section className="infoBar">
      <ShortcutInfoBar
        handleInfoBar={false}
        jumpToAbout={props.jumpToAbout}
        openDataModal={noop}
      />
    </section>
  </section>
);

ViewOne.propTypes = {
  selected: PropTypes.shape({
    keywordId: PropTypes.number,
  }).isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedKeyword: PropTypes.func.isRequired,
  jumpToAbout: PropTypes.func.isRequired,
  beginTutorial: PropTypes.func.isRequired,
  layoutOnly: PropTypes.bool,
  physicsPaused: PropTypes.bool,
};

ViewOne.defaultProps = {
  layoutOnly: PropTypes.false,
  physicsPaused: false,
};

export const ViewOneUnconnected = props => (
  <ViewOne
    {...props}
  />
);

export const ViewOneGraphQL = props => (
  <Query query={viewOneQuery}>
    {({ data }) => {
      if (!data.allKeywords) { return null; }

      const shuffledKeywords = shuffleArray(data.allKeywords
        .concat(data.allKeywords) // Make sure we don't run out of keywords
        .map(keyword => keyword.name));

      return (
        <ViewOne
          keywords={shuffledKeywords}
          {...props}
        />
      );
    }}
  </Query>
);

export default connect(({ selected }) => ({ selected }), {})(ViewOneGraphQL);
