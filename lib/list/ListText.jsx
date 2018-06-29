import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf, bool,
} from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';

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
    htmlTag: enums.SPAN,
  };

  render() {
    const {
      secondary, className, htmlTag: Tag, children,
    } = this.props;
    const classNames = classnames(
      {
        [cssClasses.TEXT]: !secondary,
        [cssClasses.TEXT_SECONDARY]: secondary,
      },
      className,
    );

    return (
      <Tag className={classNames} {...omit(this.props, usedProps.TEXT)}>
        {children}
      </Tag>
    );
  }
}

export default ListText;
