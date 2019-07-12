import React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import ViewTwo from './index';
import handleQueryError from '../../utilities/handleQueryError';
import { companyWheelQuery, locationWheelQuery, companiesByRegionQuery } from '../../queries/viewTwoQueries/wheel';
import { projectMenuQuery } from '../../queries/viewTwoQueries/projectMenu';
import * as browseByCreators from '../../actions/browseBy';
import * as selectedCreators from '../../actions/selected';
import * as searchCreators from '../../actions/search';
import { features, noRegionColor } from '../../constants';
import { viewTwo } from '../../proptypes';
import omitTypename from '../../utilities/omitTypeName';

export const ViewTwoGraphQL = (props) => {
  if (props.browseBy === 'company') {
    return (
      <Query query={companyWheelQuery}>
        {(wheelQProps) => {
          handleQueryError(wheelQProps);
          const { data: wheelQData, loading: wheelQLoading, error: wheelQerror } = wheelQProps;
          const wheelData = !wheelQLoading && !wheelQerror && wheelQData.allCompanies
            ? wheelQData.allCompanies.sort((a, b) => (a.name.localeCompare(b.name)))
            : [];
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
                  ? omitTypename(projData.allProjectsByCompany)
                  : [];
                const featuresEnums = ['theme', 'instrument', 'phase', 'status', 'type', 'filing'];
                const parsedProjectsData = projectsData.length > 0
                  && projectsData[0].aggregatedCount
                  ? projectsData.map((project, projectIndex) => {
                    const aggregated = {};
                    featuresEnums.forEach((feature) => {
                      project.aggregatedCount[feature]
                        .forEach((count, subfeatureIndex) => {
                          aggregated[feature] = ({
                            ...aggregated[feature],
                            [`${projectsData[projectIndex].aggregatedCount[`${feature}Enum`][subfeatureIndex]}`]: count,
                          });
                        });
                      if (feature === 'instrument' && Object.keys(aggregated.instrument.length > 9)) {
                        const parsedData = Object.entries(aggregated[feature]).sort(
                          (a, b) => (a.count > b.count ? -1 : 1),
                        );
                        aggregated[feature] = {};
                        parsedData.push([
                          'OTHER',
                          parsedData.splice(9).reduce((acc, cur) => (acc + cur[1]), 0),
                        ]);
                        parsedData.forEach((arrayElement) => {
                          // eslint-disable-next-line prefer-destructuring
                          aggregated[feature][arrayElement[0]] = arrayElement[1];
                        });
                      }
                    });

                    return ({
                      ...project,
                      aggregatedCount: aggregated,
                    });
                  })
                  : [];

                const selectedProject = !projLoading && !projError && props.selected.company
                  && parsedProjectsData.length > 0
                  ? parsedProjectsData.find(item => item.id === props.selected.project)
                  : null;

                const projectFeatureData = selectedProject
                  ? Object.entries(selectedProject.aggregatedCount[props.selected.feature])
                    .reduce((acc, [key, val]) => {
                      acc.push({
                        feature: props.selected.feature,
                        description: key,
                        disabled: val <= 0,
                      });
                      return acc;
                    }, [])
                  : [];

                // TODO: ERROR HANDLING
                return (
                  <ViewTwo
                    wheelData={wheelData}
                    projectsData={parsedProjectsData}
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
        // Get the aggregatedCount and create the graph for each one.
        const regionsFeatureData = locationData.length > 0
          ? locationData.map(region => (
            {
              ...region,
              name: region.name,
              province: region.province,
              aggregatedCount: Object.entries(region.aggregatedCount[props.selected.feature])
                .reduce((acc, [key, val]) => {
                  if (key !== '__typename') {
                    const description = region.aggregatedCount[`${props.selected.feature}Enum`][key];
                    let fill;
                    if (region.id === -1) {
                      fill = noRegionColor;
                    } else {
                      const subFeature = (props.selected.feature === 'instrument')
                        ? key
                        : description;
                      fill = features[props.selected.feature][subFeature];
                    }
                    acc.push({
                      feature: props.selected.feature,
                      description,
                      disabled: val <= 0,
                      value: val,
                      fill,
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
    setBrowseBy: browseByCreators.setBrowseBy,
    setProjectStatus: searchCreators.setProjectStatus,
    setProjectYear: searchCreators.setProjectYear,
    setFindAny: searchCreators.setFindAny,
    setIncluded: searchCreators.setIncluded,
    setExcluded: searchCreators.setExcluded,
  },
)(ViewTwoGraphQL);

ViewTwoGraphQL.propTypes = viewTwo;
