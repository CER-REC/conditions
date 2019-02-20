import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../Icon/index';
import handleInteraction from '../../../../utilities/handleInteraction';
import BarContainer from '../../../BarContainer';
import './styles.scss';

library.add(faMinusCircle, faPlusCircle);

class SuggestionWindowKeywords extends React.PureComponent {
  static propTypes = {
    selectedWords: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      conditions: PropTypes.number,
    })),
    suggestedKeywords: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      conditions: PropTypes.number.isRequired,
    })).isRequired,
    onClickUpdate: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selectedWords: ([{
      name: null,
      conditions: 0,
    }]),
  }

  keywordOnClick = (obj) => {
    const { selectedWords } = this.props;
    const [value, present, index] = obj;
    if (!present) {
      selectedWords.push(value);
      return this.props.onClickUpdate([selectedWords, 'words']);
    }
    selectedWords.splice(index, 1);
    return this.props.onClickUpdate([selectedWords, 'words']);
  };

  findMaxConditions = () => (
    Math.max(...this.props.suggestedKeywords.map(
      v => v.conditions,
    )));

  render() {
    return (
      <div className="SuggestionWindowKeywords">
        <ul>
          { this.props.suggestedKeywords.map((value) => {
            const { selectedWords } = this.props;
            const [present, selectedIndex] = selectedWords.reduce((acc, item, i) => (
              (acc[0] === true)
                ? acc
                : [item.name === value.name && item.conditions === value.conditions, i]
            ), [false, null]);

            const [icon, iconClass, selectedColor, textStyle] = (present)
              ? ['minus-circle', 'selectedIcon', 'rgb(238,97,41)', 'selectedText']
              : ['plus-circle', 'regularIcon', 'rgb(96,96,96)', 'regularText'];
            const maxConditions = this.findMaxConditions();
            const conditions = (value.conditions / maxConditions) * 200;
            const remainingSpace = (200 - conditions);
            return (
              <li key={`${value.name} ${value.conditions}`}>
                <span
                  className="icon"
                  {...handleInteraction(this.keywordOnClick,
                    [value, present, selectedIndex])}
                >
                  <Icon className={iconClass} icon={icon} />
                </span>
                <span className={`keywordCategory ${textStyle}`}>{value.name} </span>
                <span className="BarContainer">
                  <BarContainer
                    title="ConditionTitle"
                    desc="conditionDesc"
                    items={[{ value: conditions, fill: selectedColor },
                      { value: remainingSpace, fill: 'transparent' }]}
                    size={8}
                    scale={1}
                    vert={false}
                  />
                </span>
                <div className="conditionsText">
                  <FormattedMessage id="components.searchBar.suggestionWindow.conditions">
                    {text => <div className="conditionsText"> {value.conditions} {text}  </div>}
                  </FormattedMessage>
                </div>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default SuggestionWindowKeywords;
