import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import handleInteraction from '../../../utilities/handleInteraction';
import CircleContainer from '../../CircleContainer';
import { yearRangeType } from '../../../proptypes';
import './styles.scss';
import { reportAnalytics } from '../../../utilities/analyticsReporting';

const allProjectStatuses = ['IN_PROGRESS', 'COMPLETED'];

const findListItemValue = (target, depth = 0) => {
  if (target.value) { return Number(target.value); }
  return findListItemValue(target.parentElement, depth + 1);
};

const createYearArray = yearObject => Array(yearObject.end - yearObject.start + 1)
  .fill()
  .map((_, index) => yearObject.start + index);

const reportYearAnalytics = (start, end) => {
  reportAnalytics('filter', 'search', 'year', `${start}-${end}`);
};

const reportStatusAnalytics = (statuses) => {
  reportAnalytics('filter', 'search', 'status', statuses.map(s => s.toLowerCase()).join(', '));
};

class FilterContent extends React.PureComponent {
  static propTypes = {
    yearRange: yearRangeType.isRequired,
    projectStatus: PropTypes.arrayOf(
      PropTypes.oneOf(
        allProjectStatuses,
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

    this.availableYears = createYearArray(this.props.yearRange);

    this.state = ({
      selectedYears: { ...props.selectedYear },
    });
  }

  componentDidUpdate(prevProps) {
    const cur = this.props.selectedYear;
    const prev = prevProps.selectedYear;
    const state = this.state.selectedYears;

    if (
      (cur.start !== prev.start && cur.start !== state.start)
    || (cur.end !== prev.end && cur.end !== state.end)
    ) {
      // Workaround to let us manage the selected years in the component while
      // still being able to set them from Redux if the user hits Back, comes
      // from a shared URL, etc.
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ selectedYears: cur });
    }
  }

  onDragStart = (event) => {
    this.isDragging = true;
    const year = findListItemValue(event.target);
    this.setState({ selectedYears: { start: year, end: year } });
  }

  onDragMove = (event) => {
    if (!this.isDragging) { return; }
    const year = findListItemValue(event.target);

    this.setState(state => ({
      selectedYears: {
        start: state.selectedYears.start,
        end: year,
      },
    }));
  }

  getSelectedYearRange = () => (
    (this.state.selectedYears.end > this.state.selectedYears.start)
      ? [this.state.selectedYears.start, this.state.selectedYears.end]
      : [this.state.selectedYears.end, this.state.selectedYears.start]
  )

  onDragStop = () => {
    this.isDragging = false;
    const [start, end] = this.getSelectedYearRange();
    reportYearAnalytics(start, end);
    this.props.onYearSelect({ start, end });
  }

  onKeyPress = (event) => {
    const selectedYears = this.createSelectedYearArray();
    const lastNum = selectedYears[selectedYears.length - 1];
    const firstNum = selectedYears[0];
    if (event.key === 'ArrowRight' || event.keyCode === 39) {
      if (this.availableYears.indexOf(lastNum + 1) > -1) {
        selectedYears.push(lastNum + 1);
      }
    } else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
      if (this.availableYears.indexOf(firstNum - 1) > -1) {
        selectedYears.push(firstNum - 1);
      }
    }
    selectedYears.sort((a, b) => a - b);
    const newRange = {
      start: selectedYears[0],
      end: selectedYears[selectedYears.length - 1],
    };

    reportYearAnalytics(newRange.start, newRange.end);
    this.setState({ selectedYears: newRange });
    this.props.onYearSelect(newRange);
  }

  createSelectedYearArray = () => {
    const [start, end] = this.getSelectedYearRange();

    return createYearArray({ start, end });
  }

  onYearSelect = (year) => {
    reportYearAnalytics(year, year);
    this.props.onYearSelect({ start: year, end: year });
  }

  yearRangeRender = () => {
    const selectedYears = this.createSelectedYearArray();

    return (this.availableYears.map((i) => {
      const arrayIndex = selectedYears.indexOf(i);

      const listClasses = [];
      const circleClasses = ['regularCircle'];

      if (arrayIndex > -1) {
        listClasses.push('selectedBackground');
        if (arrayIndex === 0) { listClasses.push('leftCurve'); }
        if (arrayIndex === selectedYears.length - 1) { listClasses.push('rightCurve'); }

        circleClasses.push(
          (listClasses.length > 1)
            ? 'selectedOutsideCircle'
            : 'selectedInsideCircle',
        );
      }

      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
          {...handleInteraction(this.onYearSelect, { start: i, end: i })}
          key={i}
          value={i}
          onFocus={() => {}}
          onMouseDown={this.onDragStart}
          onMouseOver={this.onDragMove}
          onMouseUp={this.onDragStop}
          onKeyDown={this.onKeyPress}
          className={classNames(listClasses)}
        >
          <CircleContainer
            size={24}
            className={classNames(circleClasses)}
          >
            {i.toString().substring(2)}
          </CircleContainer>
        </li>
      );
    }));
  }

  filterProjectStatus = (item) => {
    const { projectStatus } = this.props;
    let updatedStatus;
    if ((projectStatus.length > 1) || (item === projectStatus[0])) {
      updatedStatus = allProjectStatuses.filter(v => v !== item);
    } else {
      updatedStatus = [...allProjectStatuses];
    }

    reportStatusAnalytics(updatedStatus);
    this.props.changeProjectStatus(updatedStatus);
  }

  reset = () => {
    reportYearAnalytics(this.props.yearRange.start, this.props.yearRange.end);
    reportStatusAnalytics(allProjectStatuses);
    this.props.changeProjectStatus(allProjectStatuses);
    this.props.onYearSelect(this.props.yearRange);
  }

  projectStatusRender = statusArray => (allProjectStatuses.map(i => (
    <li
      key={i}
      {...handleInteraction(this.filterProjectStatus, i)}
      className={statusArray.indexOf(i) > -1 ? 'selectedProject' : ''}
    >
      &nbsp;<AdvancedFormattedMessage
        id={`components.searchBar.filter.projectStatus.${i}`}
        className="upperCase"
      />&nbsp;
    </li>
  )))

  render() {
    return (
      <div className="FilterContent contentPane">
        <div {...handleInteraction(this.reset)} className="reset">
          &nbsp;<AdvancedFormattedMessage
            id="components.searchBar.reset"
            className="upperCase"
          />&nbsp;
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
        <AdvancedFormattedMessage
          id="components.searchBar.close"
          tag="button"
          type="button"
          {...handleInteraction(this.props.closeTab)}
          className="closeSearchBar upperCase"
        />
      </div>
    );
  }
}

export default FilterContent;
