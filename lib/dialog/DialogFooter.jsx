import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';
import omit from '../utils/omit';

class DialogFooter extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
  };
  static defaultProps = {
    children: null,
    className: null,
  };

  render() {
    const className = classnames('mdc-dialog__footer', this.props.className);
    return (
      <footer className={className} {...omit(this.props, Object.keys(DialogFooter.propTypes))}>
        {this.props.children}
      </footer>
    );
  }
}

export default DialogFooter;
