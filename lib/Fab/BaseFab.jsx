import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';
import './fab.scss';

import omit from '../utils/omit';

class Fab extends PureComponent {
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
        'mdc-fab': true,
        'mdc-fab--mini': this.props.mini,
        'mdc-fab--exited': this.props.exited,
        'mrcw-fab--absolute': this.props.absolute,
      },
      this.props.className,
    );
    return (
      <button
        ref={this.init}
        className={className}
        {...omit(this.props, Object.keys(Fab.defaultProps))}
      >
        {this.props.children}
      </button>
    );
  }
}

Fab.propTypes = {
  absolute: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node, PropTypes.string),
  ]),
  className: PropTypes.string,
  exited: PropTypes.bool,
  mini: PropTypes.bool,
  ripple: PropTypes.bool,
};

Fab.defaultProps = {
  absolute: true,
  children: null,
  className: null,
  exited: false,
  mini: false,
  ripple: true,
};

export default Fab;
