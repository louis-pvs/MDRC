import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf, bool,
} from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';

class CardActions extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    full: bool,
    htmlTag: string,
  };

  static defaultProps = {
    children: null,
    className: null,
    full: false,
    htmlTag: enums.DIV,
  };

  render() {
    const {
      full, className, htmlTag: Tag, children,
    } = this.props;
    const classNames = classnames(
      cssClasses.ACTIONS,
      {
        [cssClasses.FULL]: full,
      },
      className,
    );

    return (
      <Tag className={classNames} {...omit(this.props, usedProps.ACTIONS)}>
        {children}
      </Tag>
    );
  }
}

export default CardActions;
