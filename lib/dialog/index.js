import React, { PureComponent, Fragment, cloneElement } from 'react';
import { bool, oneOfType, node, string, arrayOf, func } from 'prop-types';
import classnames from 'classnames';
import { MDCDialog } from '@material/dialog';

import DialogHeader from './DialogHeader';
import DialogBody from './DialogBody';
import DialogFooter from './DialogFooter';
import { Button } from '../';
import omit from '../utils/omit';

import './dialog.scss';

class Dialog extends PureComponent {
  static propTypes = {
    activateBy: node,
    backdrop: bool,
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
    onAccept: func,
    onCancel: func,
  };
  static defaultProps = {
    activateBy: <Button />,
    backdrop: true,
    children: null,
    className: null,
    onAccept: () => {},
    onCancel: () => {},
  };

  static Header = props => <DialogHeader {...props} />;
  static Body = props => <DialogBody {...props} />;
  static Footer = props => <DialogFooter {...props} />;
  static Button = (props) => {
    const classNames = classnames(
      'dialog__footer__button',
      {
        'mdc-dialog__footer__button--accept': props.accept,
        'mdc-dialog__footer__button--cancel': props.cancel,
        'mdc-dialog__action': props.action,
      },
      props.className,
    );
    return (
      <Button
        {...omit(props, ['accept', 'cancel', 'action', 'className'])}
        className={classNames}
      />
    );
  };

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
    if (!this.props.activateBy) return null;
    const props = {
      onClick: this.activateDialog,
      role: 'button',
      tabIndex: 0,
    };
    const ActivateButton = cloneElement(this.props.activateBy, props);

    return ActivateButton;
  };

  renderBackdrop = () => {
    if (!this.props.backdrop) return null;
    return <div className="mdc-dialog__backdrop" />;
  };

  render() {
    const className = classnames('mdc-dialog', this.props.className);
    return (
      <Fragment>
        {this.renderActivation()}
        <aside
          className={className}
          aria-labelledby="my-mdc-dialog-label"
          aria-describedby="my-mdc-dialog-description"
          ref={this.init}
          {...omit(this.props, Object.keys(Dialog.propTypes))}
        >
          <div className="mdc-dialog__surface">{this.props.children}</div>
          {this.renderBackdrop()}
        </aside>
      </Fragment>
    );
  }
}

export default Dialog;
