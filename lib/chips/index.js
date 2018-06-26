import React, { PureComponent } from 'react';
import { oneOfType, arrayOf, node, string, bool, func } from 'prop-types';
import { MDCChipSet } from '@material/chips';
import classnames from 'classnames';

import './chips.scss';
import omit from '../utils/omit';
import { cssClasses, enums, usedProps } from './constants';
import ChipsItem from './ChipsItem';
import ChipsIcon from './ChipsIcon';
import ChipsText from './ChipsText';

class Chips extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    choice: bool,
    filter: bool,
    htmlTag: string,
    onSelect: func,
  };
  static defaultProps = {
    children: null,
    className: null,
    choice: false,
    filter: false,
    htmlTag: enums.DIV,
    onSelect: null,
  };

  static Item = ChipsItem;
  static Icon = ChipsIcon;
  static Text = ChipsText;

  ref = null;
  chips = null;
  init = (ref) => {
    if (ref && this.ref !== ref) {
      this.ref = ref;
      this.chips = new MDCChipSet(ref);
    }
  };

  render() {
    const className = classnames(cssClasses.ROOT, {
      [cssClasses.CHOICE]: this.props.choice,
      [cssClasses.FILTER]: this.props.filter,
    });
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} ref={this.init} {...omit(this.props, usedProps.CHIP)}>
        {this.props.children}
      </Tag>
    );
  }
}

export default Chips;
