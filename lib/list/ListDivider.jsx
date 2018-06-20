import React, { PureComponent } from 'react';
import { bool, string } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

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
      'mdc-list-divider',
      {
        'mdc-list-divider--padded': this.props.padded,
        'mdc-list-divider--inset': this.props.inset,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag
        role="separator"
        className={className}
        {...omit(this.props, Object.keys(ListDivider.propTypes))}
      />
    );
  }
}

export default ListDivider;
