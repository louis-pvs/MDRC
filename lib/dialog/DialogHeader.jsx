import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';
import omit from '../utils/omit';

class DialogHeader extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
  };
  static defaultProps = {
    children: null,
    className: null,
  };

  render() {
    const className = classnames('mdc-dialog__header', this.props.className);
    return (
      <header className={className} {...omit(this.props, Object.keys(DialogHeader.propTypes))}>
        <h2 id="mdc-dialog-with-list-label" className="mdc-dialog__header__title">
          {this.props.children}
        </h2>
      </header>
    );
  }
}

export default DialogHeader;
