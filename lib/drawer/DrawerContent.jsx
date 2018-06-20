import React, { PureComponent } from 'react';
import { bool, oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
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
    htmlTag: 'nav',
  };

  render() {
    const className = classnames('mdc-drawer__content', this.props.className);
    const Tag = this.props.htmlTag;
    if (this.props.appendClassToChild && this.props.children) {
      return cloneChildWithClassName(this.props.children, className);
    }
    return (
      <Tag className={className} {...omit(this.props, Object.keys(DrawerContent.propTypes))}>
        {this.props.children}
      </Tag>
    );
  }
}

export default DrawerContent;