import { batch } from 'react-redux';
import searchQuery from '../../queries/search';
import { searchResults, filteredProjects } from './processQueryData';

const emptySearch = { data: { includeKeywords: [''] } };

export default (app, client) => (searchVariables, filterVariables) => {
  Promise.all([
    (searchVariables.includeKeywords.length)
      ? client.query({
        query: searchQuery.findSearchResults,
        variables: searchVariables,
      })
      : emptySearch,
    client.query({
      query: searchQuery.findFilteredProjects,
      variables: filterVariables,
    }),
  ]).then((response) => {
    batch(() => {
      if (response[0]) {
        app.props.setSearchResults(searchResults(response[0].data.findSearchResults));
      }
      if (response[1]) {
        app.props.setFilteredProjects(filteredProjects(response[1].data.findFilteredProjects));
      }
    });
  });
};
