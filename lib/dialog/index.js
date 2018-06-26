import React, { PureComponent, Fragment, cloneElement, isValidElement } from 'react';
import { bool, oneOfType, node, string, arrayOf, func } from 'prop-types';
import classnames from 'classnames';
import { MDCDialog } from '@material/dialog';

import DialogHeader from './DialogHeader';
import DialogBody from './DialogBody';
import DialogFooter from './DialogFooter';
import DialogButton from './DialogButton';
import omit from '../utils/omit';
import { cssClasses, enums, usedProps, event, target } from './constants';

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
    htmlTag: enums.ASIDE,
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

      this.dialog.listen(event.ACCEPT, this.props.onAccept);
      this.dialog.listen(event.CANCEL, this.props.onCancel);
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
    return <div className={cssClasses.BACKDROP} />;
  };

  render() {
    const className = classnames(cssClasses.SURFACE, this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <Fragment>
        {this.renderActivation()}
        <div
          className={cssClasses.ROOT}
          aria-labelledby={target.LABEL}
          aria-describedby={target.DESC}
          ref={this.init}
        >
          <Tag className={className} {...omit(this.props, usedProps.DIALOG)}>
            {this.props.children}
          </Tag>
          {this.renderBackdrop()}
        </div>
      </Fragment>
    );
  }
}

export default Dialog;
