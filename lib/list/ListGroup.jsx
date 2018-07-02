import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf,
} from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';

class ListGroup extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
  };

  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.DIV,
  };

  render() {
    const { className, htmlTag: Tag, children } = this.props;
    const classNames = classnames(cssClasses.GROUP, className);

    return (
      <Tag className={classNames} {...omit(this.props, usedProps.GROUP)}>
        {children}
      </Tag>
    );
  }
}

export default ListGroup;
