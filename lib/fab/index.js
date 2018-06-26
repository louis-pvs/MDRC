import React, { PureComponent } from 'react';
import { bool, oneOfType, node, string, arrayOf } from 'prop-types';
import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';

import './fab.scss';
import Icon from '../icon';
import omit from '../utils/omit';
import { cssClasses, enums, usedProps } from './constants';

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
    htmlTag: enums.BUTTON,
  };

  static Icon = function FabIcon(props) {
    return (
      <Icon
        className={classnames(cssClasses.ICON, props.className)}
        {...omit(props, usedProps.CLASSNAME)}
      />
    );
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
      cssClasses.ROOT,
      {
        [cssClasses.MINI]: this.props.mini,
        [cssClasses.EXITED]: this.props.exited,
        [cssClasses.ABSOLUTE]: this.props.absolute,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag ref={this.init} className={className} {...omit(this.props, usedProps.INDEX)}>
        {this.props.children}
      </Tag>
    );
  }
}

export default Fab;
