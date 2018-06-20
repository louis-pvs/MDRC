import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class ListGraphic extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    meta: bool,
    htmlTag: string,
  };
  static defaultProps = {
    children: null,
    className: null,
    meta: false,
    htmlTag: 'span',
  };

  render() {
    const className = classnames(
      {
        'mdc-list-item__graphic': !this.props.meta,
        'mdc-list-item__meta': this.props.meta,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} {...omit(this.props, Object.keys(ListGraphic.propTypes))}>
        {this.props.children}
      </Tag>
    );
  }
}

export default ListGraphic;
