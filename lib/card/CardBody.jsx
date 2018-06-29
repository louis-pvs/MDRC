import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf, bool,
} from 'prop-types';
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
    const {
      outlined, className, htmlTag: Tag, children,
    } = this.props;
    const classNames = classnames(
      cssClasses.ROOT,
      {
        [cssClasses.OUTLINED]: outlined,
      },
      className,
    );

    return (
      <Tag className={classNames} {...omit(this.props, usedProps.BODY)}>
        {children}
      </Tag>
    );
  }
}

export default CardBody;
