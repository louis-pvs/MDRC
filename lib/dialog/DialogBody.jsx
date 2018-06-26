import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, enums, usedProps, target } from './constants';

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
    const className = classnames(
      cssClasses.BODY,
      { [cssClasses.SCROLL]: this.props.scrollable },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag id={target.DESC} className={className} {...omit(this.props, usedProps.BODY)}>
        {this.props.children}
      </Tag>
    );
  }
}

export default DialogBody;
