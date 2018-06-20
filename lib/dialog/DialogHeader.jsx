import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';
import omit from '../utils/omit';

class DialogHeader extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
  };
  static defaultProps = {
    children: null,
    className: null,
    htmlTag: 'h5',
  };

  render() {
    const className = classnames('mdc-dialog__header__title', this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <header
        className="mdc-dialog__header"
        {...omit(this.props, Object.keys(DialogHeader.propTypes))}
      >
        <Tag id="mdc-dialog-with-list-label" className={className}>
          {this.props.children}
        </Tag>
      </header>
    );
  }
}

export default DialogHeader;
