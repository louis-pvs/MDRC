import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';

class DrawerHeader extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
  };
  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.HEADER,
  };

  render() {
    const className = classnames(cssClasses.HEADER_CONTENT, this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <header className={cssClasses.HEADER}>
        <Tag className={className} {...omit(this.props, usedProps.HEADER)}>
          {this.props.children}
        </Tag>
      </header>
    );
  }
}

export default DrawerHeader;
