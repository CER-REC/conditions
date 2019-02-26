export default (projectData, feature) => (
  projectData.filter(project => project.feature === feature)
);
