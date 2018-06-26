import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';
import { MDCRipple } from '@material/ripple';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';

class ListItem extends PureComponent {
  static propTypes = {
    activated: bool,
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
    ripple: bool,
    selected: bool,
  };
  static defaultProps = {
    activated: false,
    children: null,
    className: null,
    htmlTag: enums.LIST_ITEM,
    ripple: true,
    selected: false,
  };

  ref = null;
  ripple = null;
  init = (ref) => {
    if (ref && this.ref !== ref) {
      this.ref = ref;
      if (this.props.ripple) {
        this.ripple = new MDCRipple(ref);
      }
    }
  };

  render() {
    const className = classnames(
      cssClasses.ITEM,
      {
        [cssClasses.ITEM_ACTIVATED]: this.props.activated,
        [cssClasses.ITEM_SELECTED]: this.props.selected,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag ref={this.init} className={className} {...omit(this.props, usedProps.ITEM)}>
        {this.props.children}
      </Tag>
    );
  }
}

export default ListItem;
