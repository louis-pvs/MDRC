import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';
import omit from '../utils/omit';
import { usedProps, target, enums, cssClasses } from './constants';

class DialogHeader extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
  };
  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.HEADER,
  };

  render() {
    const className = classnames(cssClasses.TITLE, this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <header className="mdc-dialog__header">
        <Tag id={target.LABEL} className={className} {...omit(this.props, usedProps.HEADER)}>
          {this.props.children}
        </Tag>
      </header>
    );
  }
}

export default DialogHeader;
