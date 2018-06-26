import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf } from 'prop-types';
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
    const className = classnames(cssClasses.BUTTONS, this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} {...omit(this.props, usedProps.BUTTONS)}>
        {this.props.children}
      </Tag>
    );
  }
}

export default CardButtons;
