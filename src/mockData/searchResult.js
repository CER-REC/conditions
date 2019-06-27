/* eslint-disable max-len */
export default {
  searchResults: {
    companyIds: [],
    conditionIds: [],
    projectIds: new Array(101).fill(1).map((e, i) => e + i).concat([600, 500, 700]),
  },
  filteredProjectIds: new Array(101).fill(50).map((e, i) => e + i),
};
