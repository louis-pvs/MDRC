import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf,
} from 'prop-types';
import classnames from 'classnames';

import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';

class CardButtons extends PureComponent {
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
    const classNames = classnames(cssClasses.BUTTONS, className);

    return (
      <Tag className={classNames} {...omit(this.props, usedProps.BUTTONS)}>
        {children}
      </Tag>
    );
  }
}

export default CardButtons;
