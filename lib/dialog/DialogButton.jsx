import React, { PureComponent } from 'react';
import { string, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { Button } from '../';

class DialogButton extends PureComponent {
  static propTypes = {
    accept(props, propName, componentName) {
      if (props[propName] && props.cancel) {
        return new Error(`props '${propName}' and 'cancel' can't be both 'true' in ${componentName}, choose one`);
      }
      return false;
    },
    action: bool,
    cancel(props, propName, componentName) {
      if (props[propName] && props.accept) {
        return new Error(`props '${propName}' and 'accept' can't be both 'true' in ${componentName}, choose one`);
      }
      return false;
    },
    className: string,
  };
  static defaultProps = {
    accept: false,
    action: false,
    cancel: false,
    className: null,
  };

  render() {
    const classNames = classnames(
      'dialog__footer__button',
      {
        'mdc-dialog__footer__button--accept': this.props.accept,
        'mdc-dialog__footer__button--cancel': this.props.cancel,
        'mdc-dialog__action': this.props.action,
      },
      this.props.className,
    );
    return (
      <Button {...omit(this.props, Object.keys(DialogButton.propTypes))} className={classNames} />
    );
  }
}

export default DialogButton;
