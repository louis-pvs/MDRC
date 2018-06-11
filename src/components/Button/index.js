import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';
import './button.scss';

import omit from '../../utils/omit';

class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = null;
    this.selectorClass = this.getSelectorClass(props) || 'mrcw-button';
    this.className = classnames(
      {
        'mdc-button': true,
        'mdc-button--raised': props.raised,
        'mdc-button--unelevated': props.unelevated,
        'mdc-button--outlined': props.outlined,
        'mdc-button--dense': props.dense,
        'mrcw-button': !props.className,
      },
      props.className,
    );
  }
  getSelectorClass = ({ className }) => {
    if (!className) return false;
    return className.split(' ', 1);
  };
  init = (ref) => {
    if (!this.props.ripple) this.ref = ref;
    else if (this.ref !== ref) {
      this.ref = new MDCRipple(document.querySelector(`.${this.selectorClass}`));
    }
  };
  render() {
    return (
      <button
        ref={this.init}
        className={this.className}
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
