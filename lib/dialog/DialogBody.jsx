import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf, bool,
} from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import {
  cssClasses, enums, usedProps, target,
} from './constants';

class DialogBody extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
    scrollable: bool,
  };

  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.SECTION,
    scrollable: true,
  };

  render() {
    const {
      className, scrollable, htmlTag: Tag, children,
    } = this.props;
    const classNames = classnames(cssClasses.BODY, { [cssClasses.SCROLL]: scrollable }, className);

    return (
      <Tag id={target.DESC} className={classNames} {...omit(this.props, usedProps.BODY)}>
        {children}
      </Tag>
    );
  }
}

export default DialogBody;
