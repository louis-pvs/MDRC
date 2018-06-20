import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class ListSubheader extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
    secondary: bool,
  };
  static defaultProps = {
    children: null,
    className: null,
    secondary: false,
  };

  render() {
    const className = classnames('mdc-list-group__subheader', this.props.className);
    return (
      <h3 className={className} {...omit(this.props, Object.keys(ListSubheader.propTypes))}>
        {this.props.children}
      </h3>
    );
  }
}

export default ListSubheader;
