import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class ListText extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    secondary: bool,
    htmlTag: string,
  };
  static defaultProps = {
    children: null,
    className: null,
    secondary: false,
    htmlTag: 'span',
  };

  render() {
    const className = classnames(
      {
        'mdc-list-item__text': !this.props.secondary,
        'mdc-list-item__secondary-text': this.props.secondary,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} {...omit(this.props, Object.keys(ListText.propTypes))}>
        {this.props.children}
      </Tag>
    );
  }
}

export default ListText;
