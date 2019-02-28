import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../Icon/index';
import handleInteraction from '../../../../utilities/handleInteraction';
import BarContainer from '../../../BarContainer';
import { suggestedKeywordsType } from '../../../../proptypes';
import './styles.scss';

library.add(faMinusCircle, faPlusCircle);

class KeywordList extends React.PureComponent {
  static propTypes = {
    includeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    excludeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired,
    keywords: suggestedKeywordsType.isRequired,
    isExclude: PropTypes.bool.isRequired,
  }

  keywordOnClick = (word) => {
    const { isExclude, includeKeywords, excludeKeywords } = this.props;
    if (excludeKeywords.includes(word)) {
      this.props.onClick(excludeKeywords.filter(v => v !== word), 'exclude');
    } else if (includeKeywords.includes(word)) {
      this.props.onClick(includeKeywords.filter(v => v !== word), 'include');
    } else if (isExclude) {
      this.props.onClick(excludeKeywords.concat(word), 'exclude');
    } else {
      this.props.onClick(includeKeywords.concat(word), 'include');
    }
  };

  findMaxConditions = () => (
    Math.max(...this.props.keywords.map(([, { conditions }]) => conditions))
  );

  render() {
    const { keywords, includeKeywords, excludeKeywords } = this.props;
    return (
      <div className="KeywordList">
        <ul>
          {
            (keywords).map(([key, value]) => {
              const [icon, iconClass, selectedColor, textStyle] = (includeKeywords.includes(key) || excludeKeywords.includes(key))
                ? ['minus-circle', 'selectedIcon', 'rgb(238,97,41)', 'selectedText']
                : ['plus-circle', 'regularIcon', 'rgb(96,96,96)', 'regularText'];
              const maxConditions = this.findMaxConditions();

              const conditions = (value.conditions / maxConditions);
              const remainingSpace = (1 - conditions);
              return (
                <li key={`${key} ${value.conditions}`}>
                  <div
                    className="icon"
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
                      values={{ conditions: value.conditions }}
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
