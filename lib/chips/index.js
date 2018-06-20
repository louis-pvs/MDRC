import React, { PureComponent } from 'react';
import { oneOfType, arrayOf, node, string, bool, func } from 'prop-types';
import { MDCChipSet } from '@material/chips';
import classnames from 'classnames';

import './chips.scss';
import ChipsItem from './ChipsItem';
import omit from '../utils/omit';

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
    htmlTag: 'div',
    onSelect: null,
  };

  static Item = ChipsItem;

  ref = null;
  chips = null;
  init = (ref) => {
    if (ref && this.ref !== ref) {
      this.ref = ref;
      this.chips = new MDCChipSet(ref);
    }
  };

  render() {
    const className = classnames('mdc-chip-set', {
      'mdc-chip-set--choice': this.props.choice,
      'mdc-chip-set--filter': this.props.filter,
    });
    const Tag = this.props.htmlTag;

    return (
      <Tag
        className={className}
        ref={this.init}
        {...omit(this.props, Object.keys(Chips.propTypes))}
      >
        {this.props.children}
      </Tag>
    );
  }
}

export default Chips;
