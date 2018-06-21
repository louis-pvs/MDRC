import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';
import omit from '../utils/omit';

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
    const className = classnames('mdc-dialog__footer', this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} {...omit(this.props, Object.keys(DialogFooter.propTypes))}>
        {this.props.children}
      </Tag>
    );
  }
}

export default DialogFooter;
