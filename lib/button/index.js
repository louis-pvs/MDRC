import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf, bool,
} from 'prop-types';
import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';

import './button.scss';
import Icon from '../icon';
import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';

class Button extends PureComponent {
  static Icon = function ButtonIcon(props) {
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
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    dense: bool,
    htmlTag: string,
    outlined: bool,
    raised: bool,
    ripple: bool,
    unelevated: bool,
  };

  static defaultProps = {
    children: null,
    className: null,
    dense: false,
    htmlTag: enums.BUTTON,
    outlined: false,
    raised: false,
    ripple: true,
    unelevated: false,
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
      raised, unelevated, outlined, dense, className, children, htmlTag: Tag,
    } = this.props;
    const classNames = classnames(
      cssClasses.ROOT,
      {
        [cssClasses.RAISED]: raised,
        [cssClasses.UNELEVATED]: unelevated,
        [cssClasses.OUTLINED]: outlined,
        [cssClasses.DENSE]: dense,
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

export default Button;
