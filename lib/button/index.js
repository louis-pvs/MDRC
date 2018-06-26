import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';

import './button.scss';
import Icon from '../icon';
import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';

class Button extends PureComponent {
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
        [cssClasses.RAISED]: this.props.raised,
        [cssClasses.UNELEVATED]: this.props.unelevated,
        [cssClasses.OUTLINED]: this.props.outlined,
        [cssClasses.DENSE]: this.props.dense,
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

export default Button;
