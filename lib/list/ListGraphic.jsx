import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';

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
    htmlTag: enums.SPAN,
  };

  render() {
    const className = classnames(
      {
        [cssClasses.GRAPHIC]: !this.props.meta,
        [cssClasses.META]: this.props.meta,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} {...omit(this.props, usedProps.GRAPHIC)}>
        {this.props.children}
      </Tag>
    );
  }
}

export default ListGraphic;
