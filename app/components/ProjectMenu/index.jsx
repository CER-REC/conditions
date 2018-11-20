import React from 'react';
import PropTypes from 'prop-types';
import List from '../List/';

class ProjectMenu extends React.PureComponent {
  static propTypes = {
    projectData: PropTypes.arrayOf([
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        graphData: PropTypes.arrayOf([
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
          }),
        ]),
      }),
    ]),
  }

  static defaultProps = {
    projectData: [],
  }

  render() {
    if (this.props.projectData.length === 0) {
      // TODO: Return virtualized elements
      return null;
    }
    return (
      <div className="ProjectMenu">
        <List />
      </div>
    );
  }
}

export default ProjectMenu;
