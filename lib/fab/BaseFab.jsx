import React, { PureComponent } from 'react';
import { bool, oneOfType, node, string, arrayOf } from 'prop-types';
import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';
import './fab.scss';

import omit from '../utils/omit';

class Fab extends PureComponent {
  static propTypes = {
    absolute: bool,
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    exited: bool,
    mini: bool,
    ripple: bool,
    htmlTag: string,
  };
  static defaultProps = {
    absolute: true,
    children: null,
    className: null,
    exited: false,
    mini: false,
    ripple: true,
    htmlTag: 'button',
  };

  ref = null;
  ripple = null;
  init = (ref) => {
    if (ref && this.ref !== ref) {
      this.ref = ref;
      if (this.props.ripple) {
        this.ripple = new MDCRipple(ref);
      }
    }
  };

  render() {
    const className = classnames(
      'mdc-fab',
      {
        'mdc-fab--mini': this.props.mini,
        'mdc-fab--exited': this.props.exited,
        'mrcw-fab--absolute': this.props.absolute,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag ref={this.init} className={className} {...omit(this.props, Object.keys(Fab.propTypes))}>
        {this.props.children}
      </Tag>
    );
  }
}

export default Fab;
