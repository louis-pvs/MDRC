import React, { PureComponent } from 'react';
import {
  string, func, bool, oneOf,
} from 'prop-types';
import classnames from 'classnames';

import './icon.scss';
import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';

class Icon extends PureComponent {
  ref = null;

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

  init = (ref) => {
    const { getRef } = this.props;
    if (ref && this.ref !== ref) {
      this.ref = ref;
      if (getRef) {
        getRef(ref);
      }
    }
  };

  render() {
    const {
      size, mode, inactive, htmlTag: Tag, className, iconName,
    } = this.props;
    const classNames = classnames(
      cssClasses.ICON,
      cssClasses.ROOT,
      {
        [`md-${size}`]: size,
        [`md-${mode}`]: mode,
        [cssClasses.INACTIVE]: inactive,
      },
      className,
    );

    return (
      <Tag
        ref={this.init}
        className={classNames}
        aria-hidden="true"
        {...omit(this.props, usedProps.INDEX)}
      >
        {iconName}
      </Tag>
    );
  }
}

export default Icon;
