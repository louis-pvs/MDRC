import React, { PureComponent } from 'react';
import { bool, string } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class ListDivider extends PureComponent {
  static propTypes = {
    className: string,
    padded: bool,
    inset: bool,
  };
  static defaultProps = {
    className: null,
    padded: false,
    inset: false,
  };

  render() {
    const className = classnames(
      'mdc-list-divider',
      {
        'mdc-list-divider--padded': this.props.padded,
        'mdc-list-divider--inset': this.props.inset,
      },
      this.props.className,
    );
    return (
      <li
        role="separator"
        className={className}
        {...omit(this.props, Object.keys(ListDivider.propTypes))}
      />
    );
  }
}

export default ListDivider;
