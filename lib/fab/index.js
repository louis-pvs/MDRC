import React, { PureComponent } from 'react';
import {
  bool, oneOfType, node, string, arrayOf,
} from 'prop-types';
import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';

import './fab.scss';
import Icon from '../icon';
import omit from '../utils/omit';
import { cssClasses, enums, usedProps } from './constants';

class Fab extends PureComponent {
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

  init = (ref) => {
    if (ref && this.ref !== ref) {
      const { ripple } = this.props;
      this.ref = ref;
      if (ripple) {
        this.ripple = new MDCRipple(ref);
      }
    }
  };

  render() {
    const {
      mini, exited, absolute, className, htmlTag: Tag, children,
    } = this.prosp;
    const classNames = classnames(
      cssClasses.ROOT,
      {
        [cssClasses.MINI]: mini,
        [cssClasses.EXITED]: exited,
        [cssClasses.ABSOLUTE]: absolute,
      },
      className,
    );

    return (
      <Tag ref={this.init} className={classNames} {...omit(this.props, usedProps.INDEX)}>
        {children}
      </Tag>
    );
  }
}

export default Fab;
