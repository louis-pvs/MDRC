import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf,
} from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps } from './constants';

class DialogFooter extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
  };

  static defaultProps = {
    children: null,
    className: null,
    htmlTag: 'footer',
  };

  render() {
    const { className, htmlTag: Tag, children } = this.props;
    const classNames = classnames(cssClasses.FOOTER, className);

    return (
      <Tag className={classNames} {...omit(this.props, usedProps.FOOTER)}>
        {children}
      </Tag>
    );
  }
}

export default DialogFooter;
