import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../../utilities/handleInteraction';
import CircleContainer from '../../CircleContainer';
import Icon from '../../Icon/index';
import './styles.scss';

library.add(
  faRedoAlt,
);

const findListItemValue = (target, depth = 0) => {
  if (target.value) { return Number(target.value); }
  return findListItemValue(target.parentElement, depth + 1);
};

const createYearArray = yearObject => Array(yearObject.end - yearObject.start + 1)
  .fill()
  .map((_, index) => yearObject.start + index);
class FilterContent extends React.PureComponent {
  static propTypes = {
    yearRange: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
    projectStatus: PropTypes.arrayOf(
      PropTypes.oneOf(
        ['OPEN', 'CLOSED', 'CANCELLED'],
      ),
    ).isRequired,
    onYearSelect: PropTypes.func.isRequired,
    selectedYear: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
    changeProjectStatus: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
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
    if (selectedYearArray.indexOf(li) === -1) {
      selectedYearArray.push(li);
      selectedYearArray = selectedYearArray.sort((a, b) => a - b);
      selectedYearArray = createYearArray({
        start: selectedYearArray[0],
        end: selectedYearArray[selectedYearArray.length - 1],
      });
    }
    selectedYearArray = selectedYearArray.sort((a, b) => a - b);
    const newRange = {
      start: selectedYearArray[0],
      end: selectedYearArray[selectedYearArray.length - 1],
    };

    if (this.props.selectedYear.start === newRange.start
      && this.props.selectedYear.end === newRange.end) { return; }
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
            onMouseDown={this.onDragStart}
            onMouseMove={this.onDragMove}
            onMouseUp={this.onDragStop}
            onKeyDown={this.onKeyPress}
          >
            <CircleContainer size={24} color="#999999" backgroundColor="#E6E6E6"> {i.toString().substring(2)} </CircleContainer>
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
          onMouseMove={this.onDragMove}
          onMouseUp={this.onDragStop}
          onKeyDown={this.onKeyPress}
          className={classNames(classArray)}
        >
          <CircleContainer
            size={24}
            color={(position === 'outside' ? 'rgb(96,96,96)' : 'white')}
            backgroundColor={(position === 'outside' ? 'white' : 'rgb(209, 5, 122)')}
          >
            {i.toString().substring(2)}
          </CircleContainer>
        </li>
      );
    }));
  }

  projectStatusRender = statusArray => (['OPEN', 'CLOSED', 'CANCELLED'].map(i => (
    <li
      key={i}
      {...handleInteraction(this.props.changeProjectStatus, i)}
      className={statusArray.indexOf(i) > -1 ? 'selectedProject' : ''}
    >
      <FormattedMessage id={`components.SearchBar.filter.projectStatus.${i}`}>
        {text => <span className="upperCase"> {text} </span>}
      </FormattedMessage>
    </li>
  )))

  render() {
    return (
      <div className="FilterContent">
        <div {...handleInteraction(this.props.reset)} className="reset">
          <FormattedMessage id="components.SearchBar.reset">
            { text => <span className="upperCase"> {text} </span> }
          </FormattedMessage>
          <Icon className="iconInline" icon="redo-alt" />
        </div>
        <div className="titleText">
          <FormattedMessage id="components.SearchBar.filter.projectYear" />
        </div>
        <ul className="projectList">
          {this.yearRangeRender()}
        </ul>
        <div className="titleText">
          <FormattedMessage id="components.SearchBar.filter.projectStatus.projectStatusText" />
        </div>
        <ul className="projectStatus">
          {this.projectStatusRender(this.props.projectStatus)}
        </ul>
        <FormattedMessage id="components.SearchBar.close">
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
