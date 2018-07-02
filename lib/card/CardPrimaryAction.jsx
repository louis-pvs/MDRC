import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf, bool,
} from 'prop-types';
import classnames from 'classnames';
import { MDCRipple } from '@material/ripple';

import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';

class CardMedia extends PureComponent {
  ref = null;

  ripple = null;

  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
    ripple: bool,
  };

  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.DIV,
    ripple: true,
  };

  init = (ref) => {
    const { ripple } = this.props;
    if (ref && this.ref !== ref) {
      this.ref = ref;
      if (ripple) {
        this.ripple = new MDCRipple(ref);
      }
    }
  };

  render() {
    const { className, htmlTag: Tag, children } = this.props;
    const classNames = classnames(cssClasses.PRIMARY_ACTION, className);

    return (
      <Tag ref={this.init} className={classNames} {...omit(this.props, usedProps.PRIMARY_ACTION)}>
        {children}
      </Tag>
    );
  }
}

export default CardMedia;
