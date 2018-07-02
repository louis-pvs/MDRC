import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf,
} from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';

class BaseTypography extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
  };

  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.PARAGRAPH,
  };

  render() {
    const { className, htmlTag: Tag, children } = this.props;
    const classNames = classnames(cssClasses.ROOT, className);
    return (
      <Tag className={classNames} {...omit(this.props, usedProps.BASE)}>
        {children}
      </Tag>
    );
  }
}

export default BaseTypography;
