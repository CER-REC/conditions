import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../Icon/index';
import CircleContainer from '../../CircleContainer';
import handleInteraction from '../../../utilities/handleInteraction';
import BarContainer from '../../BarContainer';

library.add(
  faMinusCircle,
  faPlusCircle,
);
class SuggestionWindow extends React.PureComponent {
  static propTypes = {
  }

  renderCategories = () => (
    ['ALL', 'WILDLIFE & HABITAT', 'ENVIRONMENT', 'ENGINEERING & STRUCTURES', 'ADMINISTRATION & FILINGS'].map((i) => {
      const selectedCategory = ['ALL'];
      const classArray = ['categoryList'];
      const className = (selectedCategory.indexOf(i) > -1) ? 'selectedCategory' : '';
      classArray.push(className);
      return (<li className={classArray.toString().replace(/,/g, ' ')}> { i } </li>);
    })
  )

  renderKeyWords = () => {
    const objectProp = [{
      name: 'safety',
      conditions: 1200,
    },
    {
      name: 'emissions',
      conditions: 1000,
    }, {
      name: 'habitat',
      conditions: 800,
    },
    {
      name: 'construction',
      conditions: 1000,
    },
    {
      name: 'habitat',
      conditions: 800,
    },
    {
      name: 'file',
      conditions: 1400,
    },
    {
      name: 'breeding breed',
      conditions: 380,
    },
    {
      name: 'safety',
      conditions: 1200,
    },
    {
      name: 'emissions',
      conditions: 1000,
    }, {
      name: 'habitat',
      conditions: 800,
    },
    {
      name: 'construction',
      conditions: 1000,
    },
    {
      name: 'habitat',
      conditions: 800,
    },
    {
      name: 'file',
      conditions: 1400,
    },
    {
      name: 'breeding breed',
      conditions: 380,
    }];

    return objectProp.map((value) => {
      const selectedArray = ['safety'];
      const icon = (selectedArray.indexOf(value.name) > -1) ? 'minus-circle' : 'plus-circle';
      const iconClass = (selectedArray.indexOf(value.name) > -1) ? 'selectedIcon' : 'regularIcon';
      const selectedColor = (selectedArray.indexOf(value.name) > -1) ? 'rgb(238,97,41)' : 'rgb(96,96,96)';
      const maxConditions = 1200;
      const conditions = (value.conditions / maxConditions) * 200;
      const remainingSpace = (200 - conditions);
      return (
        <li>
          <span className="icon">
            <Icon className={iconClass} icon={icon} />
          </span>
          <span className="keywordCategory">{value.name} </span>
          <span className="BarContainer">
            <BarContainer
              title="ConditionTitle"
              desc="conditionDesc"
              items={[{ value: conditions, fill: selectedColor }, { value: remainingSpace, fill: 'transparent' }]}
              size={8}
              scale={1}
              vert={false}
            />
          </span>
          <div className="conditionsText">
            {value.conditions} conditions
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="SuggestionWindow">
        <h1 className="keyWordsTitle"> Suggested Keywords </h1>
        <p className="description"> Keywords capture the general idea of a condition, e.g.type of species regulated. Learn more about how we extracted keywords <a> here </a>. </p>

        {/* <div className="viewTitle"> View By */}
        <ul>
          <li className="viewText"> View By: </li>
          {this.renderCategories()}
        </ul>

        <div className="rightText">
          Sort by
          <span> Frequency </span>
          |
          <span> Alphabetical </span>
          <span className="arrow">
            <svg viewBox="0 0 427.5 427.5">
              <g>
              <path d="M405.943,290.254L302.096,425.338c-1.04,1.354-2.66,2.146-4.374,2.146c-1.702,0-3.321-0.798-4.368-2.146L189.511,290.254
              c-0.769-0.993-1.144-2.176-1.144-3.357c0-1.152,0.364-2.329,1.108-3.322c1.499-1.975,4.125-2.707,6.434-1.809l68.76,27.166V21.01
              c0-3.047,2.477-5.503,5.515-5.503h55.106c3.038,0,5.509,2.456,5.509,5.503v287.922l68.76-27.166
              c2.305-0.898,4.93-0.166,6.419,1.809C407.473,285.561,407.461,288.28,405.943,290.254z M238.012,143.913
              c0.744-0.993,1.105-2.167,1.105-3.322c0-1.176-0.379-2.367-1.142-3.36L134.125,2.148C133.081,0.792,131.458,0,129.759,0
              c-1.714,0-3.328,0.798-4.377,2.148L21.539,137.23c-1.519,1.969-1.525,4.69-0.03,6.683c1.487,1.968,4.114,2.707,6.419,1.803
              l68.766-27.163v287.919c0,3.05,2.462,5.509,5.506,5.509h55.109c3.041,0,5.515-2.459,5.515-5.509V118.552l68.763,27.163
              C233.886,146.62,236.51,145.88,238.012,143.913z"
              />
            </g>
            </svg>
          </span>
          <span className="none"> NONE </span>
        </div>

        <div className="keyWordsBox">
          <ul>
            { this.renderKeyWords() }
          </ul>
        </div>
        <div className="close">
        <button> CLOSE </button>
        </div>
      </div>
    );
  }
}

export default SuggestionWindow;
