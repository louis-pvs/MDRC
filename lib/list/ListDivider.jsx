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
    const className = classnames(
      cssClasses.DIVIDER,
      {
        [cssClasses.PADDED]: this.props.padded,
        [cssClasses.INSET]: this.props.inset,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return <Tag role="separator" className={className} {...omit(this.props, usedProps.DIVIDER)} />;
  }
}

export default ListDivider;
