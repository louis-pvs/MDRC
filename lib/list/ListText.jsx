import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class ListText extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
    secondary: bool,
  };
  static defaultProps = {
    children: null,
    className: null,
    secondary: false,
  };

  render() {
    const className = classnames(
      {
        'mdc-list-item__text': !this.props.secondary,
        'mdc-list-item__secondary-text': this.props.secondary,
      },
      this.props.className,
    );
    return (
      <span className={className} {...omit(this.props, Object.keys(ListText.propTypes))}>
        {this.props.children}
      </span>
    );
  }
}

export default ListText;
