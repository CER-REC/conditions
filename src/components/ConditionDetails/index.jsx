import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import TextDetails from './TextDetails';
import List from '../List';
import BarContainer from '../BarContainer';
import SelectedGroupBar from '../SelectedGroupBar';

const searchMatch = (text, include, exclude) => {
  const some = include && include.some(word => text.match(word));
  const none = exclude && exclude.find(word => text.match(word));

  return some && !none;
};

class ConditionDetails extends React.Component {
  renderHeader() {
    // const props = {
    //   group: 'components.conditionDetails.selectedProject',
    //   backgroundColor: 'lightgray',
    //   children: [this.props.selectedProject],
    // };
    // return <SelectedGroupBar {...props} />;
    return <p>Selected Project: {this.props.selectedProject}</p>;
  }

  renderConditionBars(item) {
    return item.conditions.reduce((out, condition, idx) => {
      const tabClass = (
        this.props.searchKeywords
        && searchMatch(
          condition.text,
          this.props.searchKeywords.include,
          this.props.searchKeywords.exclude,
        )
      ) ? 'marked'
        : 'unmarked';

      out.push(
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`${item.instrument.number}-${idx}`}>
          <div className={tabClass} />
          <BarContainer
            items={
              [
                {
                  value: condition.length,
                  fill: condition.fill,
                },
              ]
            }
            size="6"
            maxValue="25"
            key={idx.toString()}
          />
        </React.Fragment>,
      );
      return out;
    }, []);
  }

  renderList() {
    const items = [];
    this.props.data.forEach((item) => {
      items.push(
        (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={item.instrument.number}>
            <div className="unmarked" />
            <span>{item.instrument.number}</span>
          </React.Fragment>
        ),
        ...this.renderConditionBars(item),
      );
    });

    return (
      <List
        items={items}
        onChange={handleInteraction}
        selected={this.props.selectedCondition}
      />
    );
  }

  renderCondition() {
    const { instrumentIndex, conditionIndex } = this.props.selectedCondition;
    const condition = this.props.data[instrumentIndex].conditions[conditionIndex];

    return (
      <pre>{JSON.stringify(condition, null, 2)}</pre>
    );
  }

  renderDetails() {

  }

  render() {
    return (
      <section className="ConditionDetails">
        <div className="header">{this.renderHeader()}</div>
        <div className="list">{this.renderList()}</div>
        <div className="blank" />
        <div className="content">{this.renderCondition()}</div>
        <div className="details">{this.renderDetails()}</div>

      </section>
    );
  }
}

ConditionDetails.propTypes = {
  expanded: PropTypes.bool,
  selectedProject: PropTypes.string.isRequired,
  searchKeywords: PropTypes.shape({
    include: PropTypes.arrayOf(PropTypes.string),
    exclude: PropTypes.arrayOf(PropTypes.string),
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    instrument: PropTypes.object,
    conditions: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,

  selectedCondition: PropTypes.shape({
    instrumentIndex: PropTypes.number,
    conditionIndex: PropTypes.number,
  }),
};

ConditionDetails.defaultProps = {
  expanded: true,
  searchKeywords: { include: [], exclude: [] },
  selectedCondition: { instrumentIndex: 0, conditionIndex: 0 },
};

export default ConditionDetails;
