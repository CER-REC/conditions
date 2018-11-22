import React from 'react';
import PropTypes from 'prop-types';
import List from '../List/';
import ProjectLegend from './ProjectLegend/';

class ProjectMenu extends React.PureComponent {
  static propTypes = {
    projectData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      graphData: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })),
    })),
    selectedFeature: PropTypes.string.isRequired,
    selectedProjectID: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    projectData: [],
    selectedProjectID: 0,
  }

  render() {
    const projectIndex = this.props.projectData
      .findIndex(project => project.id === this.props.selectedProjectID);

    const distanceFromEnd = this.props.projectData.length - projectIndex;
    const numBefore = Math.min(projectIndex, 2);
    const numAfter = Math.min(distanceFromEnd, 2);
    const listItems = this.props.projectData
      .slice(projectIndex - numBefore, projectIndex + numAfter + 1)
      .map(project => <p>{project.id}</p>);

    return (
      <div className="ProjectMenu">
        <List items={listItems} onChange={this.props.onChange} selected={numBefore} />
        <ProjectLegend legendType={this.props.selectedFeature} />
      </div>
    );
  }
}

export default ProjectMenu;
