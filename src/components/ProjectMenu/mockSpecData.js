// expectedResults is the input coming into the project menu
// and the output to the list component
// [0] input, [1] output
/*
  data format = [{ projects array input }, { project menu output }]

  ProjectMenu given a total of (input.total) projects, and a currently selected
  project of (input.selected), ProjectMenu should return an array with total projects
  of (output.total), and with a currently selected project of (output.selected)
  the selected project should have an id of (output.projectID)
  */

export const expectedResults8 = [
  [
    { total: 8, selected: 0, clickedIndex: 2 },
    {
      total: 3,
      selected: 0,
      projectID: 1225,
      before: 2,
      after: 0,
    },
  ],
  [
    { total: 8, selected: 1, clickedIndex: 3 },
    {
      total: 4,
      selected: 1,
      projectID: 1226,
      before: 1,
      after: 0,
    },
  ],
  [
    { total: 8, selected: 2, clickedIndex: 4 },
    {
      total: 5,
      selected: 2,
      projectID: 1227,
      before: 0,
      after: 0,
    },
  ],
  [
    { total: 8, selected: 3, clickedIndex: 1 },
    {
      total: 5,
      selected: 2,
      projectID: 1225,
      before: 0,
      after: 0,
    },
  ],
  [
    { total: 8, selected: 4, clickedIndex: 0 },
    {
      total: 5,
      selected: 2,
      projectID: 1225,
      before: 0,
      after: 0,
    },
  ],
  [
    { total: 8, selected: 5, clickedIndex: 4 },
    {
      total: 5,
      selected: 2,
      projectID: 1230,
      before: 0,
      after: 0,
    },
  ],
  [
    { total: 8, selected: 6, clickedIndex: 1 },
    {
      total: 4,
      selected: 2,
      projectID: 1228,
      before: 0,
      after: 1,
    },
  ],
  [
    { total: 8, selected: 7, clickedIndex: 0 },
    {
      total: 3,
      selected: 2,
      projectID: 1228,
      before: 0,
      after: 2, //should be 2
    },
  ],
  [
    { total: 8, selected: 2, clickedIndex: 3 },
    {
      total: 5,
      selected: 2,
      projectID: 1226,
      before: 0,
      after: 0,
    },
  ],
  [
    { total: 8, selected: 3, clickedIndex: 3 },
    {
      total: 5,
      selected: 2,
      projectID: 1227,
      before: 0,
      after: 0,
    },
  ],
];

export const expectedResults5 = [
  [
    { total: 5, selected: 0, clickedIndex: 0 },
    {
      total: 3,
      selected: 0,
      projectID: 1223,
      before: 2,
      after: 0,
    },
  ],
  [
    { total: 5, selected: 1, clickedIndex: 1 },
    {
      total: 4,
      selected: 1,
      projectID: 1224,
      before: 1,
      after: 0,
    },
  ],
  [
    { total: 5, selected: 2, clickedIndex: 2 },
    {
      total: 5,
      selected: 2,
      projectID: 1225,
      before: 0,
      after: 0,
    },
  ],
  [
    { total: 5, selected: 3, clickedIndex: 1 },
    {
      total: 4,
      selected: 2,
      projectID: 1225,
      before: 0,
      after: 1,
    },
  ],
  [
    { total: 5, selected: 3, clickedIndex: 2 },
    {
      total: 4,
      selected: 2,
      projectID: 1226,
      before: 0,
      after: 1,
    },
  ],
  [
    { total: 5, selected: 4, clickedIndex: 2 },
    {
      total: 3,
      selected: 2,
      projectID: 1227,
      before: 0,
      after: 2,
    },
  ],
];

export const expectedResults4 = [
  [
    { total: 4, selected: 0, clickedIndex: 0 },
    {
      total: 3,
      selected: 0,
      projectID: 1223,
      before: 2,
      after: 0,
    },
  ],
  [
    { total: 4, selected: 1, clickedIndex: 1 },
    {
      total: 4,
      selected: 1,
      projectID: 1224,
      before: 1,
      after: 0,
    },
  ],
  [
    { total: 4, selected: 2, clickedIndex: 2 },
    {
      total: 4,
      selected: 2,
      projectID: 1225,
      before: 0,
      after: 1,
    },
  ],
  [
    { total: 4, selected: 3, clickedIndex: 1 },
    {
      total: 3,
      selected: 2,
      projectID: 1225,
      before: 0,
      after: 2,
    },
  ],
  [
    { total: 4, selected: 3, clickedIndex: 2 },
    {
      total: 3,
      selected: 2,
      projectID: 1226,
      before: 0,
      after: 2,
    },
  ],
];

export const expectedResults3 = [
  [
    { total: 3, selected: 0, clickedIndex: 0 },
    {
      total: 3,
      selected: 0,
      projectID: 1223,
      before: 2,
      after: 0,
    },
  ],
  [
    { total: 3, selected: 1, clickedIndex: 1 },
    {
      total: 3,
      selected: 1,
      projectID: 1224,
      before: 1,
      after: 1, //shows after of 0 when it should be 1
    },
  ],
  [
    { total: 3, selected: 2, clickedIndex: 2 },
    {
      total: 3,
      selected: 2,
      projectID: 1225,
      before: 0,
      after: 2,
    },
  ],
];

export const expectedResults2 = [
  [
    { total: 2, selected: 0, clickedIndex: 0 },
    {
      total: 2,
      selected: 0,
      projectID: 1223,
      before: 2,
      after: 1,
    },
  ],
  [
    { total: 2, selected: 1, clickedIndex: 1 },
    {
      total: 2,
      selected: 1,
      projectID: 1224,
      before: 1,
      after: 2,
    },
  ],
];

export const expectedResults1 = [
  [
    { total: 1, selected: 0, clickedIndex: 0 },
    {
      total: 1,
      selected: 0,
      projectID: 1223,
      before: 2,
      after: 2, //shows after of 1 when it should be 2
    },
  ],
];

export const data = [
  { id: 1223, name: { en: 'Trans-Alta Limited-44245', fr: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
  { id: 1224, name: { en: 'Trans-Alta Limited-44245', fr: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
  { id: 1225, name: { en: 'Trans-Alta Limited-44245', fr: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
  { id: 1226, name: { en: 'Trans-Alta Limited-44245', fr: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
  { id: 1227, name: { en: 'Trans-Alta Limited-44245', fr: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
  { id: 1228, name: { en: 'Trans-Alta Limited-44245', fr: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
  { id: 1229, name: { en: 'Trans-Alta Limited-44245', fr: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
  { id: 1230, name: { en: 'Trans-Alta Limited-44245', fr: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
];
