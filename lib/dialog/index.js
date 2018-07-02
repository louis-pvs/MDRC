import React, {
  PureComponent, Fragment, cloneElement, isValidElement,
} from 'react';
import {
  bool, oneOfType, node, string, arrayOf, func,
} from 'prop-types';
import classnames from 'classnames';
import { MDCDialog } from '@material/dialog';

import DialogHeader from './DialogHeader';
import DialogBody from './DialogBody';
import DialogFooter from './DialogFooter';
import DialogButton from './DialogButton';
import omit from '../utils/omit';
import {
  cssClasses, enums, usedProps, event, target,
} from './constants';

import './dialog.scss';

class Dialog extends PureComponent {
  static Header = DialogHeader;

  static Body = DialogBody;

  static Footer = DialogFooter;

  static Button = DialogButton;

  ref = null;

  dialog = null;

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
    htmlTag: enums.ASIDE,
    onAccept: () => {},
    onCancel: () => {},
  };

  activateDialog = (evt) => {
    if (this.dialog) {
      this.dialog.lastFocusedTarget = evt.target;
      this.dialog.show();
    }
  };

  init = (ref) => {
    if (ref && this.ref !== ref) {
      const { onAccept, onCancel } = this.props;
      this.ref = ref;
      this.dialog = new MDCDialog(ref);

      this.dialog.listen(event.ACCEPT, onAccept);
      this.dialog.listen(event.CANCEL, onCancel);
    }
  };

  renderActivation = () => {
    const { activateBy } = this.props;
    if (isValidElement(activateBy)) {
      const props = {
        onClick: this.activateDialog,
        role: 'button',
        tabIndex: 0,
      };
      const ActivateButton = cloneElement(activateBy, props);

      return ActivateButton;
    }
    return null;
  };

  renderBackdrop = () => {
    const { backdrop } = this.props;
    if (!backdrop) return null;
    return <div className={cssClasses.BACKDROP} />;
  };

  render() {
    const { className, htmlTag: Tag, children } = this.props;
    const classNames = classnames(cssClasses.SURFACE, className);

    return (
      <Fragment>
        {this.renderActivation()}
        <div
          className={cssClasses.ROOT}
          aria-labelledby={target.LABEL}
          aria-describedby={target.DESC}
          ref={this.init}
        >
          <Tag className={classNames} {...omit(this.props, usedProps.DIALOG)}>
            {children}
          </Tag>
          {this.renderBackdrop()}
        </div>
      </Fragment>
    );
  }
}

export default Dialog;
