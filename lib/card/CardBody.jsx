import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';

class CardBody extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
    outlined: bool,
  };
  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.DIV,
    outlined: false,
  };

  render() {
    const className = classnames(
      cssClasses.ROOT,
      {
        [cssClasses.OUTLINED]: this.props.outlined,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} {...omit(this.props, usedProps.BODY)}>
        {this.props.children}
      </Tag>
    );
  }
}

export default CardBody;
