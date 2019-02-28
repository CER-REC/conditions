import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../../utilities/handleInteraction';
import CircleContainer from '../../CircleContainer';
import { yearRangeType } from '../../../proptypes';
import './styles.scss';

const findListItemValue = (target, depth = 0) => {
  if (target.value) { return Number(target.value); }
  return findListItemValue(target.parentElement, depth + 1);
};

const createYearArray = yearObject => Array(yearObject.end - yearObject.start + 1)
  .fill()
  .map((_, index) => yearObject.start + index);
class FilterContent extends React.PureComponent {
  static propTypes = {
    yearRange: yearRangeType.isRequired,
    projectStatus: PropTypes.arrayOf(
      PropTypes.oneOf(
        ['OPEN', 'CLOSED', 'CANCELLED'],
      ),
    ).isRequired,
    onYearSelect: PropTypes.func.isRequired,
    selectedYear: yearRangeType.isRequired,
    changeProjectStatus: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.isDragging = false;
  }

  onDragStart = (event) => {
    this.isDragging = true;
    const year = findListItemValue(event.target);
    this.props.onYearSelect({ start: year, end: year });
  }

  onDragMove = (event) => {
    if (!this.isDragging) { return; }
    const li = findListItemValue(event.target);
    let selectedYearArray = createYearArray(this.props.selectedYear);
    selectedYearArray.push(li);
    selectedYearArray = selectedYearArray.sort((a, b) => a - b);
    selectedYearArray = createYearArray({
      start: selectedYearArray[0],
      end: selectedYearArray[selectedYearArray.length - 1],
    });
    selectedYearArray = selectedYearArray.sort((a, b) => a - b);
    const newRange = {
      start: selectedYearArray[0],
      end: selectedYearArray[selectedYearArray.length - 1],
    };
    this.props.onYearSelect(newRange);
  }

  onDragStop = () => {
    this.isDragging = false;
  }

  onKeyPress = (event) => {
    const selectedYear = createYearArray(this.props.selectedYear);
    const yearArray = createYearArray(this.props.yearRange);
    const lastNum = selectedYear[selectedYear.length - 1];
    const firstNum = selectedYear[0];
    if (event.key === 'ArrowRight' || event.keyCode === 39) {
      if (yearArray.indexOf(lastNum + 1) > -1) {
        selectedYear.push(lastNum + 1);
      }
    } else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
      if (yearArray.indexOf(firstNum - 1) > -1) {
        selectedYear.push(firstNum - 1);
      }
    }
    selectedYear.sort((a, b) => a - b);
    this.props.onYearSelect({ start: selectedYear[0], end: selectedYear[selectedYear.length - 1] });
  }

  yearRangeRender = () => {
    const yearArray = createYearArray(this.props.yearRange);
    return (yearArray.map((i) => {
      let { selectedYear } = this.props;
      selectedYear = createYearArray(selectedYear);
      const arrayIndex = selectedYear.indexOf(i);
      if (arrayIndex === -1) {
        return (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            {...handleInteraction(this.props.onYearSelect, { start: i, end: i })}
            key={i}
            value={i}
            onFocus={() => {}}
            onMouseDown={this.onDragStart}
            onMouseOver={this.onDragMove}
            onMouseUp={this.onDragStop}
            onKeyDown={this.onKeyPress}
          >
            <CircleContainer size={24} className="regularCircle"> {i.toString().substring(2)} </CircleContainer>
          </li>
        );
      }
      const classArray = [];
      let position = 'middle';
      classArray.push('regularBackground');
      if (selectedYear.length === 1) {
        classArray.push('rightCurve');
        classArray.push('leftCurve');
        position = 'outside';
      } else if (arrayIndex === 0 && selectedYear[1] > selectedYear[0]) {
        classArray.push('leftCurve');
        position = 'outside';
      } else if (
        arrayIndex === selectedYear.length - 1
          && selectedYear[arrayIndex] > selectedYear[selectedYear.length - 2]) {
        classArray.push('rightCurve');
        position = 'outside';
      }
      return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
          {...handleInteraction(this.props.onYearSelect, { start: i, end: i })}
          key={i}
          value={i}
          onMouseDown={this.onDragStart}
          onMouseUp={this.onDragStop}
          onKeyDown={this.onKeyPress}
          className={classNames(classArray)}
        >
          <CircleContainer
            size={24}
            className={`regularCircle ${(position === 'outside') ? 'selectedOutsideCircle' : 'selectedInsideCircle'}`}
          >
            {i.toString().substring(2)}
          </CircleContainer>
        </li>
      );
    }));
  }

  filterProjectStatus = (item) => {
    const { projectStatus } = this.props;
    const updatedStatus = projectStatus.includes(item)
      ? projectStatus.filter(v => v !== item)
      : projectStatus.concat(item);
    this.props.changeProjectStatus(updatedStatus);
  }

  reset = () => {
    this.props.changeProjectStatus(['OPEN', 'CLOSED', 'CANCELLED']);
    this.props.onYearSelect(this.props.yearRange);
  }

  projectStatusRender = statusArray => (['OPEN', 'CLOSED', 'CANCELLED'].map(i => (
    <li
      key={i}
      {...handleInteraction(this.filterProjectStatus, i)}
      className={statusArray.indexOf(i) > -1 ? 'selectedProject' : ''}
    >
      <FormattedMessage id={`components.searchBar.filter.projectStatus.${i}`}>
        {text => <span className="upperCase"> {text} </span>}
      </FormattedMessage>
    </li>
  )))

  render() {
    return (
      <div className="FilterContent">
        <div {...handleInteraction(this.reset)} className="reset">
          <FormattedMessage id="components.searchBar.reset">
            { text => <span className="upperCase"> {text} </span> }
          </FormattedMessage>
          <svg width={12} viewBox="0 0 427.5 427.5">
            <path
              d="M316.2,329.6c-60.9,57.6-157,54.8-214.6-6.1c-54.1-57.3-55.4-146.3-3-205.2c55.8-57.5,136.1-70.5,196.1-12.3
              l-55.2,56.8L427,197.5L386.8,11.2l-55.2,56.8c-76.2-71.2-195.8-67.2-267,9.1c-1.6,1.7-3.2,3.5-4.7,5.2
              c-74.9,79.8-71,205.2,8.9,280.2c77.9,73.1,199.7,71.3,275.5-4L316.2,329.6z"
            />
          </svg>
        </div>
        <div className="titleText">
          <FormattedMessage id="components.searchBar.filter.projectYear" />
        </div>
        <ul className="projectList">
          {this.yearRangeRender()}
        </ul>
        <div className="titleText">
          <FormattedMessage id="components.searchBar.filter.projectStatus.projectStatusText" />
        </div>
        <ul className="projectStatus">
          {this.projectStatusRender(this.props.projectStatus)}
        </ul>
        <FormattedMessage id="components.searchBar.close">
          { text => (
            <button {...handleInteraction(this.props.closeTab)} className="close upperCase" type="button">
              {text }
            </button>
          )}
        </FormattedMessage>
      </div>
    );
  }
}

export default FilterContent;
