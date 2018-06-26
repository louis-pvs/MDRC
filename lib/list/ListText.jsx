import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';

class ListText extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    secondary: bool,
    htmlTag: string,
  };
  static defaultProps = {
    children: null,
    className: null,
    secondary: false,
    htmlTag: enums.SPAN,
  };

  render() {
    const className = classnames(
      {
        [cssClasses.TEXT]: !this.props.secondary,
        [cssClasses.TEXT_SECONDARY]: this.props.secondary,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} {...omit(this.props, usedProps.TEXT)}>
        {this.props.children}
      </Tag>
    );
  }
}

export default ListText;
