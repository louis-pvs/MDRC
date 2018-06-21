import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';
import './button.scss';

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
    htmlTag: 'button',
    outlined: false,
    raised: false,
    ripple: true,
    unelevated: false,
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
      'mdc-button',
      {
        'mdc-button--raised': this.props.raised,
        'mdc-button--unelevated': this.props.unelevated,
        'mdc-button--outlined': this.props.outlined,
        'mdc-button--dense': this.props.dense,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag
        ref={this.init}
        className={className}
        {...omit(this.props, Object.keys(Button.propTypes))}
      >
        {this.props.children}
      </Tag>
    );
  }
}

export default Button;
