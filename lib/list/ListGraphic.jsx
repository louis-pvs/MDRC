import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf, bool,
} from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';

class ListGraphic extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    meta: bool,
    htmlTag: string,
  };

  static defaultProps = {
    children: null,
    className: null,
    meta: false,
    htmlTag: enums.SPAN,
  };

  render() {
    const {
      meta, className, children, htmlTag: Tag,
    } = this.props;
    const classNames = classnames(
      {
        [cssClasses.GRAPHIC]: !meta,
        [cssClasses.META]: meta,
      },
      className,
    );

    return (
      <Tag className={classNames} {...omit(this.props, usedProps.GRAPHIC)}>
        {children}
      </Tag>
    );
  }
}

export default ListGraphic;
