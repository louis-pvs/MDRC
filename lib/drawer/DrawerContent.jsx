import React, { PureComponent } from 'react';
import {
  bool, oneOfType, node, string, arrayOf,
} from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';
import cloneChildWithClassName from '../utils/cloneChildWithClassName';

class DrawerContent extends PureComponent {
  static propTypes = {
    appendClassToChild: bool,
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
  };

  static defaultProps = {
    appendClassToChild: false,
    children: null,
    className: null,
    htmlTag: enums.NAV,
  };

  render() {
    const {
      className, htmlTag: Tag, children, appendClassToChild,
    } = this.props;
    const classNames = classnames(cssClasses.CONTENT, className);
    if (appendClassToChild && children) {
      return cloneChildWithClassName(children, classNames);
    }

    return (
      <Tag className={classNames} {...omit(this.props, usedProps.CONTENT)}>
        {children}
      </Tag>
    );
  }
}

export default DrawerContent;
