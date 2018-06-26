import React, { PureComponent } from 'react';
import { string, func, bool, oneOf } from 'prop-types';
import classnames from 'classnames';

import './icon.scss';
import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';

class Icon extends PureComponent {
  static propTypes = {
    className: string,
    getRef: func,
    iconName: string.isRequired,
    inactive: bool,
    mode: oneOf(enums.MODE),
    size: oneOf(enums.SIZE),
    htmlTag: string,
  };
  static defaultProps = {
    className: null,
    getRef: null,
    inactive: false,
    mode: null,
    size: null,
    htmlTag: enums.ITALIC,
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
      cssClasses.ICON,
      cssClasses.ROOT,
      {
        [`md-${this.props.size}`]: this.props.size,
        [`md-${this.props.mode}`]: this.props.mode,
        [cssClasses.INACTIVE]: this.props.inactive,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag
        ref={this.init}
        className={className}
        aria-hidden="true"
        {...omit(this.props, usedProps.INDEX)}
      >
        {this.props.iconName}
      </Tag>
    );
  }
}

export default Icon;
