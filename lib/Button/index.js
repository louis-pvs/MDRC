import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';
import './button.scss';

import omit from '../utils/omit';

class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = null;
  }
  init = (ref) => {
    if (ref && this.props.ripple) {
      this.ref = new MDCRipple(ref);
    }
  };
  render() {
    const className = classnames(
      {
        'mdc-button': true,
        'mdc-button--raised': this.props.raised,
        'mdc-button--unelevated': this.props.unelevated,
        'mdc-button--outlined': this.props.outlined,
        'mdc-button--dense': this.props.dense,
      },
      this.props.className,
    );
    return (
      <button
        ref={this.init}
        className={className}
        {...omit(this.props, Object.keys(Button.defaultProps))}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node, PropTypes.string),
  ]),
  className: PropTypes.string,
  dense: PropTypes.bool,
  outlined: PropTypes.bool,
  raised: PropTypes.bool,
  ripple: PropTypes.bool,
  unelevated: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  className: null,
  dense: false,
  outlined: false,
  raised: false,
  ripple: true,
  unelevated: false,
};

export default Button;
