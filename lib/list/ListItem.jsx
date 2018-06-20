import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class ListItem extends PureComponent {
  static propTypes = {
    activated: bool,
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
    selected: bool,
  };
  static defaultProps = {
    activated: false,
    children: null,
    className: null,
    selected: false,
  };

  render() {
    const className = classnames(
      'mdc-list-item',
      {
        'mdc-list-item--activated': this.props.activated,
        'mdc-list-item--selected': this.props.selected,
      },
      this.props.className,
    );
    return (
      <li className={className} {...omit(this.props, Object.keys(ListItem.propTypes))}>
        {this.props.children}
      </li>
    );
  }
}

export default ListItem;
