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

  renderInstrumentBars(inst) {
    return inst.conditions.reduce((out, condition, idx) => {
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
        <React.Fragment>
          <div className={tabClass} />
          <BarContainer
            items={
              [
                {
                  value: condition.length,
                  fill: condition.fill,
                }
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
    this.props.instruments.forEach((inst) => {
      items.push(
        (
          <React.Fragment>
            <div className="unmarked" />
            <span key={inst.instrument}>{inst.instrument}</span>
          </React.Fragment>
        ),
        ...this.renderInstrumentBars(inst),
      );
    });

    return <List items={items} onChange={handleInteraction} selected={this.props.selectedCondition} />;
  }

  renderCondition() {

  }

  renderDetails() {

  }

  render() {
    return (
      <section className="ConditionDetails">
        <div className="header">{this.renderHeader()}</div>
        <div className="list">{this.renderList()}</div>
        <div className="blank" />
        <div className="content">{this.renderCondition}</div>
        <div className="details">{this.renderDetails}</div>

      </section>
    );
  }
};
ConditionDetails.propTypes = {
  expanded: PropTypes.bool,
  selectedProject: PropTypes.string.isRequired,
  searchKeywords: PropTypes.shape({
    include: PropTypes.arrayOf(PropTypes.string),
    exclude: PropTypes.arrayOf(PropTypes.string),
  }),
  instruments: PropTypes.arrayOf(PropTypes.object).isRequired,

  selectedCondition: PropTypes.shape({
    instrument: PropTypes.string,
    conditionIndex: PropTypes.number,
  }),
};

ConditionDetails.defaultProps = {
  expanded: false,
  searchKeywords: {include: [], exclude: []},
  selectedCondition: 1,
};

export default ConditionDetails;
