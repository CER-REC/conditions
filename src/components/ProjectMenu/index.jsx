import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '../List';
import ProjectChart from './ProjectChart';
import './styles.scss';

class ProjectMenu extends React.PureComponent {
  static propTypes = {
    selectedProjectID: PropTypes.number.isRequired,
    selectedFeature: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    projectsData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.shape({
        english: PropTypes.string.isRequired,
        french: PropTypes.string.isRequired,
      }).isRequired,
      shortName: PropTypes.shape({
        english: PropTypes.string.isRequired,
        french: PropTypes.string.isRequired,
      }).isRequired,
      graphData: PropTypes.shape({
        instrument: PropTypes.objectOf(PropTypes.number).isRequired,
        theme: PropTypes.objectOf(PropTypes.number).isRequired,
        phase: PropTypes.objectOf(PropTypes.number).isRequired,
        status: PropTypes.objectOf(PropTypes.number).isRequired,
        type: PropTypes.objectOf(PropTypes.number).isRequired,
        filing: PropTypes.objectOf(PropTypes.number).isRequired,
      }).isRequired,
    })).isRequired,
  }

  getListItems = () => {
    const projects = this.props.projectsData;
    const projectIndex = projects.findIndex(project => project.id === this.props.selectedProjectID);
    const distanceFromEnd = this.props.projectsData.length - projectIndex;
    const numBefore = Math.min(projectIndex, 2);
    const numAfter = Math.min(distanceFromEnd, 2);

    return this.props.projectsData
      .slice(projectIndex - numBefore, projectIndex + numAfter + 1);
  }

  handleConditionChange = (listItemIndex) => {
    const visibleListItems = this.getListItems();
    this.props.onChange(visibleListItems[listItemIndex].id);
  }

  getReformattedData = (pickedFeature) => {
    const reformattedData = pickedFeature.map((obj) => {
      const item = { name: obj[0], count: obj[1] };
      return item;
    });
    return reformattedData;
  }

  render() {
    const listItems = this.getListItems();
    const renderedItems = listItems
      .map((project) => {
        const { graphData } = project;
        const pickedFeature = Object.entries(graphData[this.props.selectedFeature]);
        return (
          <ProjectChart
            key={project.id}
            chartType={this.props.selectedFeature}
            graphData={this.getReformattedData(pickedFeature)}
            projectName={project.name.english}
            selected={project.id === this.props.selectedProjectID}
          />
        );
      });

    const selected = listItems
      .findIndex(project => project.id === this.props.selectedProjectID);
    const itemLength = listItems.length;
    const accountForSmallList = itemLength <= 4 ? itemLength - selected : null;
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
