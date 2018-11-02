import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import EncodingMenu from '../../components/EncodingMenu/';
import TrendButton from '../../components/TrendButton/';
import CompanyWheel from '../../components/CompanyWheel/';
import ProjectMenu from '../../components/ProjectMenu/';
import ProjectDetails from '../../components/ProjectDetails/';
import getCompaniesAndProjects from '../../queries/getCompaniesAndProjects';

import './styles.scss';

const View2 = props => (
  <div className="view view2">
    <div className="grid-item col-12">
      <EncodingMenu
        selectedEncoding={props.selectedEncoding}
        setEncoding={props.setEncoding}
      />
    </div>
    <div className="grid-item col-12">
      <TrendButton
        selectedEncoding={props.selectedEncoding}
      />
    </div>
    <div className="grid-item col-12">
      <Query query={getCompaniesAndProjects}>
        {({ loading, error, data }) => {
          // TODO: Implement loading indicator for CompanyWheel
          if (loading) { return null; }
          if (error) { console.error('CompanyWheel:', error); return null; }
          return (
            <CompanyWheel
              selectedCompany={props.selectedCompany}
              selectedProject={props.selectedProject}
              setCompany={props.setCompany}
              companies={data.getAllCompanies}
              projects={data.getAllProjects}
            />
          );
        }}
      </Query>
    </div>
    <div className="grid-item col-12">
      <ProjectMenu
        selectedCompany={props.selectedCompany}
        selectedProject={props.selectedProject}
        selectedEncoding={props.selectedEncoding}
        setProject={props.setProject}
      />
    </div>
    <div className="grid-item col-12">
      <ProjectDetails
        selectedCompany={props.selectedCompany}
        selectedProject={props.selectedProject}
        selectedEncoding={props.selectedEncoding}
      />
    </div>
  </div>
);

View2.propTypes = {
  selectedEncoding: PropTypes.string.isRequired,
  selectedCompany: PropTypes.string.isRequired,
  selectedProject: PropTypes.string.isRequired,
  setEncoding: PropTypes.func.isRequired,
  setCompany: PropTypes.func.isRequired,
  setProject: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    selectedEncoding: state.selectedEncoding,
    selectedCompany: state.selectedCompany,
    selectedProject: state.selectedProject,
  }),
  {
    setEncoding: () => ({}),
    setCompany: () => ({}),
    setProject: () => ({}),
  },
)(View2);
