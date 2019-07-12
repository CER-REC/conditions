import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Icon from '../../../Icon/index';
import handleInteraction from '../../../../utilities/handleInteraction';
import BarContainer from '../../../BarContainer';
import './styles.scss';

library.add(faMinusCircle, faPlusCircle);

class KeywordList extends React.PureComponent {
  static propTypes = {
    includeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    excludeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    setIncluded: PropTypes.func.isRequired,
    setExcluded: PropTypes.func.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      category: PropTypes.arrayOf(PropTypes.string),
      conditionCount: PropTypes.number,
    })).isRequired,
    isExclude: PropTypes.bool.isRequired,
  }

  keywordOnClick = (word) => {
    const { isExclude, includeKeywords, excludeKeywords } = this.props;
    if (excludeKeywords.includes(word)) {
      this.props.setExcluded(excludeKeywords.filter(v => v !== word));
    } else if (includeKeywords.includes(word)) {
      this.props.setIncluded(includeKeywords.filter(v => v !== word));
    } else if (isExclude) {
      this.props.setExcluded(excludeKeywords.concat(word));
    } else {
      this.props.setIncluded(includeKeywords.concat(word));
    }
  };

  findMaxConditions = () => (
    Math.max(...this.props.keywords.map(({ conditionCount }) => conditionCount))
  );

  render() {
    const { keywords, includeKeywords, excludeKeywords } = this.props;
    return (
      <div className="KeywordList">
        <ul>
          {
            (keywords).map((value) => {
              const key = value.name;
              const [icon, iconClass, selectedColor, textStyle] = (includeKeywords.includes(key)
                || excludeKeywords.includes(key))
                ? ['minus-circle', 'selectedIcon', 'rgb(238,97,41)', 'selectedText']
                : ['plus-circle', 'regularIcon', 'rgb(96,96,96)', 'regularText'];

              const maxConditions = this.findMaxConditions();

              const conditions = (value.conditionCount / maxConditions);
              const remainingSpace = (1 - conditions);
              return (
                <li key={`${key} ${value.conditionCount}`}>
                  <div
                    className={classNames('icon', { disabled: (includeKeywords.length === 6 || excludeKeywords.length === 6) })}
                    {...handleInteraction(this.keywordOnClick, key)}
                  >
                    <Icon className={iconClass} icon={icon} />
                  </div>
                  <div className={`keywordCategory ${textStyle}`}>{key} </div>
                  <BarContainer
                    items={[{ value: conditions, fill: selectedColor },
                      { value: remainingSpace, fill: 'transparent' }]}
                    height="8px"
                  />
                  <div className="conditionsText">
                    <FormattedMessage
                      id="components.searchBar.suggestedKeywordsPopout.conditions"
                      values={{ conditions: value.conditionCount }}
                    />
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

export default KeywordList;
