import React, { PureComponent } from 'react';
import { node, string, oneOfType, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class Drawer extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
    permanent: bool,
    persistent: bool,
  };
  static defaultProps = {
    children: null,
    className: string,
    permanent: false,
    persistent: false,
  };

  render() {
    const className = classnames(
      'mdc-drawer',
      {
        'mdc-drawer--permanent': this.props.permanent,
        'mdc-drawer--persistent': this.props.persistent,
      },
      this.props.className,
    );
    return (
      <div className={className} {...omit(this.props, Object.keys(Drawer.propTypes))}>
        {this.props.children}
      </div>
    );
  }
}

export default Drawer;
