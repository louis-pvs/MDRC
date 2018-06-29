import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf, bool,
} from 'prop-types';
import classnames from 'classnames';
import { MDCRipple } from '@material/ripple';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';

class ListItem extends PureComponent {
  ref = null;

  ripple = null;

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

  init = (ref) => {
    if (ref && this.ref !== ref) {
      const { ripple } = this.props;
      this.ref = ref;
      if (ripple) {
        this.ripple = new MDCRipple(ref);
      }
    }
  };

  render() {
    const {
      activated, selected, className, htmlTag: Tag, children,
    } = this.props;
    const classNames = classnames(
      cssClasses.ITEM,
      {
        [cssClasses.ITEM_ACTIVATED]: activated,
        [cssClasses.ITEM_SELECTED]: selected,
      },
      className,
    );

    return (
      <Tag ref={this.init} className={classNames} {...omit(this.props, usedProps.ITEM)}>
        {children}
      </Tag>
    );
  }
}

export default ListItem;
