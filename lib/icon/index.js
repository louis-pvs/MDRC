import React, { PureComponent } from 'react';
import { string, func, bool, oneOf, oneOfType } from 'prop-types';
import classnames from 'classnames';

import './icon.scss';
import omit from '../utils/omit';

class Icon extends PureComponent {
  static propTypes = {
    className: string,
    getRef: func,
    iconName: string.isRequired,
    inactive: bool,
    mode: oneOf(['dark', 'light']),
    size: oneOfType([oneOf([18, 24, 36, 48]), oneOf(['18', '24', '36', '48'])]),
  };
  static defaultProps = {
    className: null,
    getRef: null,
    inactive: false,
    mode: null,
    size: null,
  };

  ref = null;
  init = (ref) => {
    if (ref && this.ref !== ref) {
      this.ref = ref;
      if (this.props.getRef) {
        this.props.getRef(ref);
      }
    }
  };

  render() {
    const className = classnames(
      'material-icons',
      'mrcw-icon',
      {
        [`md-${this.props.size}`]: this.props.size,
        [`md-${this.props.mode}`]: this.props.mode,
        'md-inactive': this.props.inactive,
      },
      this.props.className,
    );
    return (
      <i
        ref={this.init}
        className={className}
        aria-hidden="true"
        {...omit(this.props, Object.keys(Icon.propTypes))}
      >
        {this.props.iconName}
      </i>
    );
  }
}

export default Icon;
