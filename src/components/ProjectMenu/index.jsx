import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '../List';
import ProjectChart from './ProjectChart';
import { project as projectData, nullableNumber } from '../../proptypes';
import { loadingProjectsData } from '../../mockData';
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
  }

  static defaultProps = {
    loading: false,
    projectsData: [loadingProjectsData],
    selectedProjectID: null,
  }

  getListItems = () => {
    const { projectsData, selectedProjectID } = this.props;
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

  handleConditionChange = (listItemIndex) => {
    if (this.props.loading) { return; }
    const visibleListItems = this.getListItems();
    this.props.onChange(visibleListItems[listItemIndex].id);
  }

  getReformattedData = data => (
    Object.entries(data[this.props.selectedFeature])
      .map(([name, count]) => ({ name, count }))
  );

  getSedimentationWidth = () => {
    const data = this.props.projectsData;

    const leftCount = data.findIndex(project => project.id === this.props.selectedProjectID);
    const rightCount = data.length - leftCount - 1;

    return [
      leftCount < 35 ? leftCount : 35,
      rightCount < 35 ? rightCount : 35,
    ];
  };

  render() {
    const { loading, selectedProjectID, selectedFeature, onChange } = this.props;
    const listItems = this.getListItems();
    // If there are no listItems render virtualized data
    // TODO: Make fake renderedItems for loading of projectMenu
    const renderedItems = listItems ? listItems
      .map(project => (
        <ProjectChart
          key={project.id}
          chartType={selectedFeature}
          graphData={this.getReformattedData(project.aggregatedCount)}
          projectName={project.shortName.en}
          selected={project.id === selectedProjectID}
          loading={loading}
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

    const [sedimentationLeft, sedimentationRight] = this.getSedimentationWidth();

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
          onChange={this.handleConditionChange}
          selected={selected}
          horizontal
        />
      </div>
    );
  }
}

export default ProjectMenu;
