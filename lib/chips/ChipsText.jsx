import React, { PureComponent } from 'react';
import {
  string, oneOfType, node, arrayOf,
} from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';

class ChipsText extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
  };

  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.SPAN,
  };

  render() {
    const { className, htmlTag: Tag, children } = this.props;
    const classNames = classnames(cssClasses.TEXT, className);

    return (
      <Tag className={classNames} {...omit(this.props, usedProps.TEXT)}>
        {children}
      </Tag>
    );
  }
}

export default ChipsText;
