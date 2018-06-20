import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class ListItem extends PureComponent {
  static propTypes = {
    activated: bool,
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    selected: bool,
    htmlTag: string,
  };
  static defaultProps = {
    activated: false,
    children: null,
    className: null,
    selected: false,
    htmlTag: 'li',
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
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} {...omit(this.props, Object.keys(ListItem.propTypes))}>
        {this.props.children}
      </Tag>
    );
  }
}

export default ListItem;
