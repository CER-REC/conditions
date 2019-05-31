import React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import ViewTwo from './index';
import { companyWheelQuery, locationWheelQuery, companiesByRegionQuery } from '../../queries/viewTwoQueries/wheel';
import { projectMenuQuery } from '../../queries/viewTwoQueries/projectMenu';
import * as browseByCreators from '../../actions/browseBy';
import * as selectedCreators from '../../actions/selected';
import * as searchCreators from '../../actions/search';
import { features } from '../../constants';
import { viewTwo } from '../../proptypes';

export const ViewTwoGraphQL = (props) => {
  if (props.browseBy === 'company') {
    return (
    // The queries must be by company and location and then subdivide.
      <Query query={companyWheelQuery}>
        {(wheelQueryProps) => {
          const { data: wheelQData, loading: wheelQLoading, error: wheelQerror } = wheelQueryProps;
          return (
            <Query
              query={projectMenuQuery}
              variables={{ id: props.selected.company }}
              skip={!props.selected.company}
            >
              { (projectMenuQprops) => {
                const {
                  loading: projLoading,
                  error: projError,
                  data: projData,
                } = projectMenuQprops;
                const wheelData = !wheelQLoading && !wheelQerror && wheelQData.allCompanies
                  ? wheelQData.allCompanies.sort((a, b) => (a.name < b.name ? -1 : 1))
                  : [];
                const selectedProject = props.selected.company && !projLoading && !projError
                  ? projData.allProjectsByCompany.find(item => item.id === props.selected.project)
                  : null;
                const projectFeatureData = selectedProject
                  ? Object.entries(selectedProject.aggregatedCount[props.selected.feature])
                    .reduce((acc, [key, val]) => {
                      if (key !== '__typename') {
                        acc.push({
                          feature: props.selected.feature,
                          description: key,
                          disabled: val <= 0,
                        });
                      }
                      return acc;
                    }, [])
                  : [];
                const projectsData = !projLoading && !projError && props.selected.company
                  ? projData.allProjectsByCompany
                  : [];

                // TODO: ERROR HANDLING

                return (
                  <ViewTwo
                    wheelData={wheelData}
                    projectsData={projectsData}
                    projectMenuLoading={projLoading}
                    legendItems={projectFeatureData}
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
      (allRegionsQueryProps) => {
        // eslint-disable-next-line no-shadow
        const locationData = allRegionsQueryProps.data.allRegions
          ? allRegionsQueryProps.data.allRegions.sort(
            (a, b) => (a.province < b.province ? -1 : 1),
          )
          : [];
        // Get the aggregatedCount and create the graph for each one.
        const regionsFeatureData = locationData.length > 0
          ? locationData.map(region => (
            {
              ...region,
              // TODO: REMOVE THE TWO FOLLOWING LINES ONCE
              // THE DEFAULT LOCALE INTEGRATION HAS BEEN SETUP
              name: region.name.en,
              province: region.province,
              aggregatedCount: Object.entries(region.aggregatedCount[props.selected.feature])
                .reduce((acc, [key, val]) => {
                  if (key !== '__typename') {
                    acc.push({
                      feature: props.selected.feature,
                      description: key,
                      disabled: val <= 0,
                      value: val,
                      fill: features[props.selected.feature][key],
                      id: region.id,
                    });
                  }
                  return acc;
                }, []),
            }))
          : [];
        const legendItems = regionsFeatureData.length > 0 && props.selected.region
          ? regionsFeatureData.find(
            region => region.id === props.selected.region,
          ).aggregatedCount
          : [];
        return (
          <Query
            query={companiesByRegionQuery}
            variables={{ id: props.selected.region }}
            skip={!props.selected.region}
          >
            {(companiesByRegionProps) => {
              const data = !companiesByRegionProps.error
                && !companiesByRegionProps.loading
                && companiesByRegionProps.data
                && companiesByRegionProps.data.companiesByRegionId;
              const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
              const regionCompanyData = data ? JSON.parse(JSON.stringify(data), omitTypename) : [{ name: '', id: 0 }];
              return (
                <ViewTwo
                  {...props}
                  wheelData={regionsFeatureData}
                  legendItems={legendItems}
                  regionCompanyData={regionCompanyData}
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
    setSelectedCompany: selectedCreators.setSelectedCompany,
    setSelectedRegion: selectedCreators.setSelectedRegion,
    setSelectedCondition: selectedCreators.setSelectedCondition,
    setSelectedProject: selectedCreators.setSelectedProject,
    setBrowseBy: browseByCreators.setBrowseBy,
    setProjectStatus: searchCreators.setProjectStatus,
    setProjectYear: searchCreators.setProjectYear,
    setFindAny: searchCreators.setFindAny,
    setIncluded: searchCreators.setIncluded,
    setExcluded: searchCreators.setExcluded,
  },
)(ViewTwoGraphQL);

ViewTwoGraphQL.propTypes = viewTwo;
