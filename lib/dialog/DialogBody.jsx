import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';
import omit from '../utils/omit';

class DialogBody extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
    scrollable: bool,
  };
  static defaultProps = {
    children: null,
    className: null,
    scrollable: true,
  };

  render() {
    const className = classnames(
      'mdc-dialog__body',
      { 'mdc-dialog__body--scrollable': this.props.scrollable },
      this.props.className,
    );
    return (
      <section
        id="my-mdc-dialog-description"
        className={className}
        {...omit(this.props, Object.keys(DialogBody.propTypes))}
      >
        {this.props.children}
      </section>
    );
  }
}

export default DialogBody;
