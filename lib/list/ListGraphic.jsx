import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class ListGraphic extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
    meta: bool,
  };
  static defaultProps = {
    children: null,
    className: null,
    meta: false,
  };

  render() {
    const className = classnames(
      {
        'mdc-list-item__graphic': !this.props.meta,
        'mdc-list-item__meta': this.props.meta,
      },
      this.props.className,
    );
    return (
      <span className={className} {...omit(this.props, Object.keys(ListGraphic.propTypes))}>
        {this.props.children}
      </span>
    );
  }
}

export default ListGraphic;
