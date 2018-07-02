import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf,
} from 'prop-types';
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
    const { className, htmlTag: Tag, children } = this.props;
    const classNames = classnames(cssClasses.HEADER_CONTENT, className);

    return (
      <header className={cssClasses.HEADER}>
        <Tag className={classNames} {...omit(this.props, usedProps.HEADER)}>
          {children}
        </Tag>
      </header>
    );
  }
}

export default DrawerHeader;
