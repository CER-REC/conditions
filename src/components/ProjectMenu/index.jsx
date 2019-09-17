import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '../List';
import ProjectChart from './ProjectChart';
import { project as projectData, nullableNumber, displayOrder } from '../../proptypes';
import { loadingProjectsData } from '../../mockData';
import getKeyedAggregatedCount from '../../utilities/getKeyedAggregatedCount';
import './styles.scss';

class ProjectMenu extends React.PureComponent {
  static propTypes = {
    /** The Project id of the item currently selected */
    selectedProjectID: nullableNumber,
    /** The selected feature */
    selectedFeature: PropTypes.string.isRequired,
    /** Function for updating the project selected index */
    onChange: PropTypes.func.isRequired,
    /** All of the projects condition data */
    projectsData: PropTypes.arrayOf(projectData),
    /** A flag used to simulate data inside the project menu while loading */
    loading: PropTypes.bool,
    relevantProjectLookup: PropTypes.objectOf(PropTypes.bool),
    filteredProjectLookup: PropTypes.objectOf(PropTypes.bool),
    displayOrder: displayOrder.isRequired,
  }

  static defaultProps = {
    loading: false,
    projectsData: [],
    selectedProjectID: null,
    relevantProjectLookup: {},
    filteredProjectLookup: {},
  }

  getListItems = (projectsData, selectedProjectID) => {
    const projectIndex = selectedProjectID === null
      ? -1
      : projectsData.findIndex(project => project.id === selectedProjectID);
    if (projectsData.length === 0 && projectIndex === -1) {
      return [];
    }
    const distanceFromEnd = projectsData.length - projectIndex;
    const numBefore = Math.min(projectIndex, 2);
    const numAfter = Math.min(distanceFromEnd, 2);

    return projectsData
      .slice(projectIndex - numBefore, projectIndex + numAfter + 1);
  }

  handleProjectChange = (listItemIndex) => {
    if (this.props.loading) { return; }
    const visibleListItems = this.getListItems(this.props.projectsData,
      this.props.selectedProjectID);
    this.props.onChange(visibleListItems[listItemIndex].id);
  }

  getReformattedData = (data, selectedFeature) => {
    const counts = getKeyedAggregatedCount(data, selectedFeature);
    return this.props.displayOrder[selectedFeature]
      .map(name => ({ name, count: counts[name] || 0 }));
  };

  getSedimentationWidth = (data) => {
    const leftCount = data.findIndex(project => project.id === this.props.selectedProjectID) - 2;
    const rightCount = data.length - leftCount - 5;

    return [
      Math.max(0, Math.min(leftCount, 35)),
      Math.max(0, Math.min(rightCount, 35)),
    ];
  };

  render() {
    const { loading, onChange } = this.props;
    let { selectedProjectID, projectsData, selectedFeature } = this.props;
    const isListEmpty = this.getListItems(projectsData, selectedProjectID).length === 0;

    if (loading || isListEmpty) {
      projectsData = [{ ...loadingProjectsData, id: 0 }];
      selectedProjectID = 0;
      selectedFeature = 'theme';
    }
    const listItems = this.getListItems(projectsData, selectedProjectID);

    const renderedItems = listItems ? listItems
      .map(project => (
        <ProjectChart
          key={project.id}
          chartType={selectedFeature}
          graphData={this.getReformattedData(project.aggregatedCount, selectedFeature)}
          numberOfConditions={project.numberOfConditions}
          projectName={project.shortName}
          selected={project.id === selectedProjectID}
          loading={loading}
          relevantProjectLookup={this.props.relevantProjectLookup}
          filteredProjectLookup={this.props.filteredProjectLookup}
          projectId={project.id}
        />
      ))
      : [];

    const selected = selectedProjectID === null
      ? -1
      : listItems.findIndex(project => project.id === selectedProjectID);

    // If no project is selected, set it to the first project
    if (selected === -1 && listItems.length > 0) { onChange(listItems[0].id); }

    const paddingBefore = Math.max(0, 2 - selected);
    const paddingAfter = 5 - listItems.length - paddingBefore;

    const [sedimentationLeft, sedimentationRight] = loading ? [0, 0]
      : this.getSedimentationWidth(projectsData);
    return (
      <div
        className={classNames(
          'ProjectMenu',
          `paddingBefore${paddingBefore}`,
          `paddingAfter${paddingAfter}`,
          { loading },
        )}
      >
        <div className="pipe" />
        <div className={classNames('sedimentation', 'left')} style={{ width: sedimentationLeft }} />
        <div className={classNames('sedimentation', 'right')} style={{ width: sedimentationRight }} />
        <List
          items={renderedItems}
          onChange={this.handleProjectChange}
          selected={selected}
          horizontal
        />
      </div>
    );
  }
}

export default ProjectMenu;
