import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class ListSubheader extends PureComponent {
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
    htmlTag: 'h5',
  };

  render() {
    const className = classnames('mdc-list-group__subheader', this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} {...omit(this.props, Object.keys(ListSubheader.propTypes))}>
        {this.props.children}
      </Tag>
    );
  }
}

export default ListSubheader;
