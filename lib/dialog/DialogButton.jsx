import React, { PureComponent } from 'react';
import { string, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';
import notTruthyWith from '../utils/notTruthyWith';
import Button from '../button';

class DialogButton extends PureComponent {
  static propTypes = {
    [enums.ACCEPT]: (...validates) => notTruthyWith([enums.CANCEL], ...validates),
    [enums.CANCEL]: (...validates) => notTruthyWith([enums.ACCEPT], ...validates),
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
    const classNames = classnames(
      cssClasses.BUTTON,
      {
        [cssClasses.ACCEPT]: this.props[enums.ACCEPT],
        [cssClasses.ACTION]: this.props.action,
        [cssClasses.CANCEL]: this.props[enums.CANCEL],
      },
      this.props.className,
    );
    return <Button className={classNames} {...omit(this.props, usedProps.BUTTON)} />;
  }
}

export default DialogButton;
