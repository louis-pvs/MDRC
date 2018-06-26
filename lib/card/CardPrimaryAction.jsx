import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';
import { MDCRipple } from '@material/ripple';

import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';

class CardMedia extends PureComponent {
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
    const className = classnames(cssClasses.PRIMARY_ACTION, this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <Tag ref={this.init} className={className} {...omit(this.props, usedProps.PRIMARY_ACTION)}>
        {this.props.children}
      </Tag>
    );
  }
}

export default CardMedia;
