import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class BaseTypography extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
    tagName: string,
  };
  static defaultProps = {
    children: null,
    className: null,
    tagName: 'p',
  };
  render() {
    const className = classnames('mdc-typography', this.props.className);
    const TagName = this.props.tagName;
    return (
      <TagName className={className} {...omit(this.props, Object.keys(BaseTypography.propTypes))}>
        {this.props.children}
      </TagName>
    );
  }
}

export default BaseTypography;
