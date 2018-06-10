import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MDCRipple } from '@material/ripple';
import className from 'classnames';
import './button.scss';

class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = null;
    this.defaultClassName = 'mrcw-button';
    this.className = className(
      {
        'mdc-button': true,
        'mdc-button--raised': props.raised,
        'mdc-button--unelevated': props.unelevated,
        'mdc-button--outlined': props.outlined,
        'mdc-button--dense': props.dense,
        [this.defaultClassName]: !props.customClassName,
      },
      props.customClassName,
    );
  }
  init = (ref) => {
    if (this.ref !== ref) {
      this.ref = new MDCRipple(document.querySelector(`.${this.props.customClassName || this.defaultClassName}`));
    }
  };
  render() {
    return (
      <button ref={this.init} className={this.className}>
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
  customClassName: PropTypes.string,
  dense: PropTypes.bool,
  outlined: PropTypes.bool,
  raised: PropTypes.bool,
  unelevated: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  customClassName: null,
  dense: false,
  outlined: false,
  raised: false,
  unelevated: true,
};

export default Button;
