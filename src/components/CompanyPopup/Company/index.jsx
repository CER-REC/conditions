import React from 'react';
import PropTypes from 'prop-types';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import PopupBtn from '../../PopupBtn';
import './styles.scss';

// eslint-disable-next-line react/prop-types
const ProjectName = React.memo(({ children, name }) => <h2>{children} <strong>{name}</strong></h2>);

// eslint-disable-next-line react/prop-types
const BulletList = React.memo(({ children }) => {
  const arr = children.split('\n'); // eslint-disable-line react/prop-types
  const first = arr.shift();
  const items = arr.map(bullet => <li key={bullet}>{bullet.replace(/^.*(-|•) /, '')}</li>);

  return (
    <React.Fragment>
      <p>{first}</p>
      <ul className="bullets">
        {items}
      </ul>
    </React.Fragment>
  );
});

const Company = ({ projectName, companies, closeModal }) => (
  <div className="Company pad-bottom">
    <AdvancedFormattedMessage
      id="components.modal.company.name"
      tag={ProjectName}
      name={projectName}
    />
    <AdvancedFormattedMessage id="components.modal.company.associated" tag="h3" />
    <ul className="companies">
      {companies.map(({ name }) => <li key={name}>{name}</li>)}
    </ul>
    <AdvancedFormattedMessage id="components.modal.company.meaningHeading" tag="h4" />
    <AdvancedFormattedMessage id="components.modal.company.meaningText" tag={BulletList} />
    <AdvancedFormattedMessage
      id="components.modal.company.back"
      tag={PopupBtn}
      className="large bottom-right"
      icon="x"
      action={closeModal}
    />
  </div>
);

Company.propTypes = {
  projectName: PropTypes.string.isRequired,
  companies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default React.memo(Company);
