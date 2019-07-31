import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import PopupBtn from '../../PopupBtn';
import './styles.scss';

// eslint-disable-next-line react/prop-types
const ProjectName = React.memo(({ children, name }) => <h2>{children} <strong>{name}</strong></h2>);

const Company = ({ projectName, companies, closeModal }) => (
  <div className="Company">
    <AdvancedFormattedMessage
      id="components.modal.company.name"
      tag={ProjectName}
      name={projectName}
    />
    <AdvancedFormattedMessage id="components.modal.company.associated" tag="h3" />
    <ul className="companies">
      {companies.map(company => <li key={company}>{company}</li>)}
    </ul>
    <AdvancedFormattedMessage id="components.modal.company.meaningHeading" tag="h4" />
    <FormattedMessage id="components.modal.company.meaningText">
      {(text) => {
        const arr = text.split('\n');
        const first = arr.shift();
        const items = arr.map(bullet => <li key={bullet}>{bullet.match(/- ?(.+)/)[1]}</li>);

        return (
          <React.Fragment>
            <p>{first}</p>
            <ul className="bullets">
              {items}
            </ul>
          </React.Fragment>
        );
      }}
    </FormattedMessage>
    <AdvancedFormattedMessage
      id="components.modal.company.back"
      tag={PopupBtn}
      icon="x"
      action={closeModal}
    />
  </div>
);

Company.propTypes = {
  projectName: PropTypes.string.isRequired,
  companies: PropTypes.arrayOf(PropTypes.string).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default React.memo(Company);
