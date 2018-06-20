import React, { PureComponent, Fragment, cloneElement, isValidElement } from 'react';
import { bool, oneOfType, node, string, arrayOf, func } from 'prop-types';
import classnames from 'classnames';
import { MDCDialog } from '@material/dialog';

import DialogHeader from './DialogHeader';
import DialogBody from './DialogBody';
import DialogFooter from './DialogFooter';
import DialogButton from './DialogButton';
import omit from '../utils/omit';

import './dialog.scss';

class Dialog extends PureComponent {
  static propTypes = {
    activateBy: node,
    backdrop: bool,
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
    onAccept: func,
    onCancel: func,
  };
  static defaultProps = {
    activateBy: null,
    backdrop: true,
    children: null,
    className: null,
    htmlTag: 'aside',
    onAccept: () => {},
    onCancel: () => {},
  };

  static Header = DialogHeader;
  static Body = DialogBody;
  static Footer = DialogFooter;
  static Button = DialogButton;

  activateDialog = (evt) => {
    if (this.dialog) {
      this.dialog.lastFocusedTarget = evt.target;
      this.dialog.show();
    }
  };

  ref = null;
  dialog = null;
  init = (ref) => {
    if (ref && this.ref !== ref) {
      this.ref = ref;
      this.dialog = new MDCDialog(ref);

      this.dialog.listen('MDCDialog:accept', this.props.onAccept);
      this.dialog.listen('MDCDialog:cancel', this.props.onCancel);
    }
  };

  renderActivation = () => {
    if (isValidElement(this.props.activateBy)) {
      const props = {
        onClick: this.activateDialog,
        role: 'button',
        tabIndex: 0,
      };
      const ActivateButton = cloneElement(this.props.activateBy, props);

      return ActivateButton;
    }
    return null;
  };

  renderBackdrop = () => {
    if (!this.props.backdrop) return null;
    return <div className="mdc-dialog__backdrop" />;
  };

  render() {
    const className = classnames('mdc-dialog', this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <Fragment>
        {this.renderActivation()}
        <Tag
          className={className}
          aria-labelledby="my-mdc-dialog-label"
          aria-describedby="my-mdc-dialog-description"
          ref={this.init}
          {...omit(this.props, Object.keys(Dialog.propTypes))}
        >
          <div className="mdc-dialog__surface">{this.props.children}</div>
          {this.renderBackdrop()}
        </Tag>
      </Fragment>
    );
  }
}

export default Dialog;
