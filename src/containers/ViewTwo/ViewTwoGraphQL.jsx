import React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import memoize from 'lodash.memoize';
import ViewTwo from './index';
import handleQueryError from '../../utilities/handleQueryError';
import {
  companyWheelQuery,
  locationWheelQuery,
  companiesByRegionQuery,
} from '../../queries/viewTwoQueries/wheel';
import { projectMenuQuery } from '../../queries/viewTwoQueries/projectMenu';
import * as browseByCreators from '../../actions/browseBy';
import * as selectedCreators from '../../actions/selected';
import * as searchCreators from '../../actions/search';
import { viewTwo } from '../../proptypes';
import omitTypename from '../../utilities/omitTypeName';

const emptyArray = [];
const memoizeWheelData = memoize(data => {
  if (!data) { return emptyArray; }
  return [...data].sort((a, b) => a.name.localeCompare(b.name));
});

export const ViewTwoGraphQL = (props) => {
  if (props.browseBy === 'company') {
    return (
      <Query query={companyWheelQuery}>
        {(wheelQProps) => {
          handleQueryError(wheelQProps);
          const { data: wheelQData, loading: wheelQLoading, error: wheelQerror } = wheelQProps;
          const wheelData = memoizeWheelData(wheelQData.allCompanies);
          return (
            <Query
              query={projectMenuQuery}
              variables={{ id: props.selected.company }}
              skip={!props.selected.company}
            >

              { (projectMenuQprops) => {
                handleQueryError(projectMenuQprops);
                const {
                  loading: projLoading,
                  error: projError,
                  data: projData,
                } = projectMenuQprops;

                const projectsData = !projLoading && !projError && props.selected.company
                  ? (projData.allProjectsByCompany || emptyArray)
                  : [];

                const selectedProject = props.selected.company && projectsData.length > 0
                  ? projectsData.find(item => item.id === props.selected.project)
                  : null;
                const selectedAggregatedCount = selectedProject
                  ? selectedProject.aggregatedCount
                  : undefined;

                // TODO: ERROR HANDLING
                return (
                  <ViewTwo
                    wheelData={wheelData}
                    projectsData={projectsData}
                    projectMenuLoading={projLoading}
                    selectedAggregatedCount={selectedAggregatedCount}
                    displayOrder={props.displayOrder}
                    {...props}
                  />
                );
              }}
            </Query>
          );
        }
        }
      </Query>
    );
  }
  return (
    <Query query={locationWheelQuery}>{
      (allRegionsQProps) => {
        handleQueryError(allRegionsQProps);
        // eslint-disable-next-line no-shadow
        const {
          data: regionsQData,
          loading: regionsQLoading,
          error: regionsQError,
        } = allRegionsQProps;
        const locationData = !regionsQLoading && !regionsQError && regionsQData.allRegions
          ? regionsQData.allRegions.sort((a, b) => {
            if (a.province === b.province) {
              return (a.name < b.name ? -1 : 1);
            }
            return (a.province < b.province ? -1 : 1);
          })
          : [];
        const selectedLocation = props.selected.region
          ? locationData.find(region => region.id === props.selected.region)
          : null;
        const selectedAggregatedCount = selectedLocation
          ? selectedLocation.aggregatedCount
          : undefined;

        return (
          <Query
            query={companiesByRegionQuery}
            variables={{ id: props.selected.region }}
            skip={!props.selected.region}
          >
            {(companiesByRegionProps) => {
              handleQueryError(companiesByRegionProps);
              const {
                data: compByRegQdata,
                loading: compByRegQload,
                error: compByRegQerror,
              } = companiesByRegionProps;
              const data = !compByRegQerror && !compByRegQload && compByRegQdata
                && compByRegQdata.companiesByRegionId;
              const regionCompanyData = {
                companies: data ? omitTypename(data) : [{ name: '', id: 0 }],
                selectedConditionCompanies: [],
              };
              return (
                <ViewTwo
                  {...props}
                  wheelData={locationData}
                  selectedAggregatedCount={selectedAggregatedCount}
                  regionCompanyData={regionCompanyData}
                  displayOrder={props.displayOrder}
                />
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default connect(
  ({ selected, browseBy, search }) => ({
    selected,
    browseBy,
    included: search.included,
    projectStatus: search.projectStatus,
    findAny: search.findAny,
    projectYear: search.projectYear,
    excluded: search.excluded,
  }),
  {
    setSelectedFeature: selectedCreators.setSelectedFeature,
    setBrowseBy: browseByCreators.setBrowseBy,
    setProjectStatus: searchCreators.setProjectStatus,
    setProjectYear: searchCreators.setProjectYear,
    setFindAny: searchCreators.setFindAny,
    setIncluded: searchCreators.setIncluded,
    setExcluded: searchCreators.setExcluded,
  },
)(ViewTwoGraphQL);

ViewTwoGraphQL.propTypes = viewTwo;
