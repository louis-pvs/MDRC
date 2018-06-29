import React, { PureComponent } from 'react';
import { string, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';
import notTruthyWith from '../utils/notTruthyWith';
import Button from '../button';

class DialogButton extends PureComponent {
  static propTypes = {
    [enums.ACCEPT]: function validate(...validates) {
      return notTruthyWith([enums.CANCEL], ...validates);
    },
    [enums.CANCEL]: function validate(...validates) {
      return notTruthyWith([enums.ACCEPT], ...validates);
    },
    action: bool,
    className: string,
  };

  static defaultProps = {
    [enums.ACCEPT]: false,
    [enums.CANCEL]: false,
    action: false,
    className: null,
  };

  render() {
    const {
      action, className, [enums.ACCEPT]: accept, [enums.CANCEL]: cancel,
    } = this.props;
    const classNames = classnames(
      cssClasses.BUTTON,
      {
        [cssClasses.ACCEPT]: accept,
        [cssClasses.ACTION]: action,
        [cssClasses.CANCEL]: cancel,
      },
      className,
    );
    return <Button className={classNames} {...omit(this.props, usedProps.BUTTON)} />;
  }
}

export default DialogButton;
