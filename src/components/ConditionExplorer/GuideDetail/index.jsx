import React from 'react';
import './styles.scss';
import { FormattedMessage } from 'react-intl';

// TODO: Get detail description from iLab and investigate ideal locations to include the text
const formatLink = (link, text) => (
  <FormattedMessage id={text}>
    {txt => <a href={link} rel="noopener noreferrer" target="_blank"> {txt} </a>}
  </FormattedMessage>
);

const GuideDetail = () => {
  const overviewText = (
    <React.Fragment>
      <h1 className="title"> Overview: </h1>
      <FormattedMessage
        id="components.conditionExplorer.guide.overview.overview1"
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
  );

  const scopeText = (
    <React.Fragment>
      <h1 className="title"> The genesis and scope of conditions </h1>
      <FormattedMessage
        id="components.conditionExplorer.guide.scope.scope1"
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
        values={{
          themeLink: formatLink('', 'common.linkText.here'),
        }}
      />
      {/* TODO: Get link from iLab because currently not in design doc */}
      <FormattedMessage id="components.conditionExplorer.guide.scope.scope3" />
      <FormattedMessage
        id="components.conditionExplorer.guide.scope.scope4"
        values={{
          conditionLink: formatLink('', 'common.linkText.here'),
        }}
      />
      <FormattedMessage
        id="components.conditionExplorer.guide.scope.scope5"
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
  );

  const complianceText = (
    <React.Fragment>
      <h1 className="title"> Conditions tracking and compliance </h1>
      {/* TODO: Get links from iLab */}
      <FormattedMessage
        id="components.conditionExplorer.guide.compliance.detail"
        values={{
          FilingsLink: formatLink('', 'common.linkText.explorableHere'),
        }}
      />
      <FormattedMessage id="components.conditionExplorer.guide.compliance.documentationPrompt" />
      <ul>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <li key={i}>
            <FormattedMessage
              id={`components.conditionExplorer.guide.compliance.doc${i}`}
            />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );

  return (
    <div className="GuideDetail">
      {overviewText}
      {scopeText}
      {complianceText}
    </div>
  );
};

GuideDetail.propTypes = {};

GuideDetail.defaultProps = {};

export default GuideDetail;
