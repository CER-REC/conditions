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
  }

  static defaultProps = {
    projectData: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      projectIndex: 0,
    };
  }

  onChange(index) {
    this.setState({ projectIndex: index });
  }

  render() {
    if (this.props.projectData.length === 0) {
      // TODO: Return virtualized elements
      return null;
    }

    const focusedProjects = this.props.projectData.slice(this.state.projectIndex, 6);

    const listItems = focusedProjects
      .map((project) => {
        if (!project.id) { return null; }
        return (<span>{project.id}</span>);
      });

    return (
      <div className="ProjectMenu">
        <List items={listItems} onChange={this.onChange} />
        <ProjectLegend items={focusedProjects.graphData} />
      </div>
    );
  }
}

export default ProjectMenu;
