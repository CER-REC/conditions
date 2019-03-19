import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '../List';
import ProjectChart from './ProjectChart';
import { project as projectData } from '../../proptypes';
import './styles.scss';

class ProjectMenu extends React.PureComponent {
  static propTypes = {
    selectedProjectID: PropTypes.number,
    selectedFeature: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    projectsData: PropTypes.arrayOf(projectData).isRequired,
  }

  static defaultProps = {
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
    const visibleListItems = this.getListItems();
    this.props.onChange(visibleListItems[listItemIndex].id);
  }

  getReformattedData = pickedFeature => pickedFeature.map(([name, count]) => ({ name, count }));

  render() {
    const listItems = this.getListItems();
    // If there are no listItems render virtualized data
    // TODO: Make fake renderedItems for loading of projectMenu 
    const renderedItems = listItems ? listItems
      .map((project) => {
        const { data } = project;
        const pickedFeature = Object.entries(data[this.props.selectedFeature]);
        return (
          <ProjectChart
            key={project.id}
            chartType={this.props.selectedFeature}
            graphData={this.getReformattedData(pickedFeature)}
            projectName={project.name.english}
            selected={project.id === this.props.selectedProjectID}
          />
        );
      })
      : [];

    const selected = this.props.selectedProjectID === null
      ? -1
      : listItems.findIndex(project => project.id === this.props.selectedProjectID);
    const itemLength = listItems.length;
    const accountForSmallList = itemLength <= 4 ? itemLength - selected : 0;
    const itemsBefore = selected < 2 ? Math.max(2 - selected, 0) : 0;
    const itemsAfter = (selected > (listItems.length - 3))
      ? 2 - (listItems.length - 3 + accountForSmallList)
      : 0;

    return (
      <div
        className={classNames(
          'ProjectMenu',
          `paddingBefore${itemsBefore}`,
          `paddingAfter${itemsAfter}`,
        )}
      >
        <div className="pipe" />
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
