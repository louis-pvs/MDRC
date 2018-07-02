import React, { PureComponent } from 'react';
import { bool, string } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps } from './constants';

class ListDivider extends PureComponent {
  static propTypes = {
    className: string,
    inset: bool,
    padded: bool,
    htmlTag: string,
  };

  static defaultProps = {
    className: null,
    inset: false,
    padded: false,
    htmlTag: 'li',
  };

  render() {
    const {
      padded, inset, className, htmlTag: Tag,
    } = this.props;
    const classNames = classnames(
      cssClasses.DIVIDER,
      {
        [cssClasses.PADDED]: padded,
        [cssClasses.INSET]: inset,
      },
      className,
    );

    return <Tag role="separator" className={classNames} {...omit(this.props, usedProps.DIVIDER)} />;
  }
}

export default ListDivider;
