import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import CircleContainer from '../../CircleContainer';
import List from '../../List';
import Icon from '../../Icon';
import './styles.scss';

library.add(
  faAngleRight,
  faAngleLeft,
);

// TODO: Get detail description from iLab and investigate ideal locations to include the text
const formatLink = (link, text) => (
  <FormattedMessage id={text}>
    {txt => <a href={link} rel="noopener noreferrer" target="_blank"> {txt} </a>}
  </FormattedMessage>
);

const steps = [
  (
    <React.Fragment>
      <FormattedMessage
        id="components.conditionExplorer.guide.overview.title"
        tagName="h1"
      />
      <FormattedMessage
        id="components.conditionExplorer.guide.overview.overview1"
        tagName="p"
        values={{
          NEB: formatLink(
            'https://www.neb-one.gc.ca/bts/nws/fs/nbqckfcts-eng.html',
            'common.linkText.NEB',
          ),
          applicationsLink: formatLink(
            'https://www.neb-one.gc.ca/bts/nws/rgltrsnpshts/2016/06rgltrsnpsht-eng.html',
            'common.linkText.applications',
          ),
          lifecycleLink: formatLink(
            'https://www.neb-one.gc.ca/bts/nws/vds/thlfcclapprch-eng.html',
            'common.linkText.lifecycle',
          ),
          envProtectionLink: formatLink(
            'https://www.neb-one.gc.ca/bts/nws/vds/nvrnmntlprtctn-eng.html',
            'common.linkText.envProtection',
          ),
          conditionsLink: formatLink(
            'https://www.neb-one.gc.ca/bts/nws/vds/cndtncmplnc-eng.html',
            'common.linkText.conditions',
          ),
        }}
      />
      <FormattedMessage
        id="components.conditionExplorer.guide.overview.overview2"
        tagName="p"
        values={{
          hereLink: formatLink(
            'https://www.neb-one.gc.ca/bts/whwr/pplnrgltncnd-eng.html',
            'common.linkText.here',
          ),
          mapLink: formatLink(
            'https://www.neb-one.gc.ca/sftnvrnmnt/sft/dshbrd/rgltdpplns-eng.html',
            'common.linkText.map',
          ),
        }}
      />
    </React.Fragment>
  ),
  (
    <React.Fragment>
      <FormattedMessage
        id="components.conditionExplorer.guide.scope.title"
        tagName="h1"
      />
      <FormattedMessage
        id="components.conditionExplorer.guide.scope.scope1"
        tagName="p"
        values={{
          regulationsLink: formatLink(
            'https://www.neb-one.gc.ca/bts/ctrg/lstctrg-eng.html',
            'common.linkText.lawsRegulations',
          ),
        }}
      />
      {/* TODO: Get link from iLab because currently not in design doc */}
      <FormattedMessage
        id="components.conditionExplorer.guide.scope.scope2"
        tagName="p"
        values={{
          themeLink: formatLink('', 'common.linkText.here'),
        }}
      />
      {/* TODO: Get link from iLab because currently not in design doc */}
      <FormattedMessage
        id="components.conditionExplorer.guide.scope.scope3"
        tagName="p"
      />
      <FormattedMessage
        id="components.conditionExplorer.guide.scope.scope4"
        tagName="p"
        values={{
          conditionLink: formatLink('', 'common.linkText.here'),
        }}
      />
      <FormattedMessage
        id="components.conditionExplorer.guide.scope.scope5"
        tagName="p"
        values={{
          applicationLink: formatLink(
            'https://www.neb-one.gc.ca/bts/nws/rgltrsnpshts/2016/06rgltrsnpsht-eng.html',
            'common.linkText.appProcess',
          ),
          hearingsLink: formatLink(
            'https://www.neb-one.gc.ca/bts/nws/rgltrsnpshts/2016/03rgltrsnpsht-eng.html',
            'common.linkText.hearings',
          ),
          intervenorLink: formatLink(
            'https://www.neb-one.gc.ca/prtcptn/hrng/pplngprtcpt-eng.html',
            'common.linkText.here',
          ),
        }}
      />
    </React.Fragment>
  ),
  (
    <React.Fragment>
      <FormattedMessage
        id="components.conditionExplorer.guide.compliance.title"
        tagName="h1"
      />
      {/* TODO: Get links from iLab */}
      <FormattedMessage
        id="components.conditionExplorer.guide.compliance.detail"
        tagName="p"
        values={{
          FilingsLink: formatLink('', 'common.linkText.explorableHere'),
        }}
      />
      <FormattedMessage
        id="components.conditionExplorer.guide.compliance.documentationPrompt"
        tagName="p"
      />
      <ul>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <FormattedMessage
            key={i}
            id={`components.conditionExplorer.guide.compliance.doc${i}`}
            tagName="li"
          />
        ))}
      </ul>
    </React.Fragment>
  ),
];

const GuideDetail = (props) => {
  const { changeStep, selected, radius } = props;

  const goToStep = useMemo(
    () => steps.map((_, i) => () => changeStep(i)),
    [changeStep, selected],
  );

  const circles = steps.map((element, index) => (
    <CircleContainer
      key={index /* eslint-disable-line react/no-array-index-key */}
      size={10}
      onClick={goToStep[index]}
      className={selected === index ? 'gray' : 'lightgrey'}
    >
      &nbsp;
    </CircleContainer>
  ));

  return (
    <section className="GuideDetail" style={{ width: radius * 2, height: radius * 2 }}>
      <div className="step-text">{steps[selected]}</div>
      <div className="step-controls">
        <List
          selected={selected}
          arrowsAtEdges
          horizontal
          onChange={changeStep}
          items={circles}
        />
      </div>
    </section>
  );
};

GuideDetail.propTypes = {
  selected: PropTypes.number.isRequired,
  changeStep: PropTypes.func.isRequired,
  radius: PropTypes.number.isRequired,
};

GuideDetail.defaultProps = {};

export default GuideDetail;
