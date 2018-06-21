import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class DrawerHeader extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
  };
  static defaultProps = {
    children: null,
    className: null,
    htmlTag: 'h5',
  };

  render() {
    const className = classnames('mdc-drawer__header-content', this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <header className="mdc-drawer__header">
        <Tag className={className} {...omit(this.props, Object.keys(DrawerHeader.propTypes))}>
          {this.props.children}
        </Tag>
      </header>
    );
  }
}

export default DrawerHeader;
