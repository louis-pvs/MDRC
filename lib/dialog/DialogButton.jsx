import React, { PureComponent } from 'react';
import { string, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import notTruthyWith from '../utils/notTruthyWith';
import { Button } from '../';

class DialogButton extends PureComponent {
  static propTypes = {
    accept: (...validates) => notTruthyWith(['cancel'], ...validates),
    action: bool,
    cancel: (...validates) => notTruthyWith(['accept'], ...validates),
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
