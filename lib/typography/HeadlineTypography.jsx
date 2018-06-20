import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, oneOf } from 'prop-types';

import BaseTypography from './BaseTypography';
import omit from '../utils/omit';

class HeadlineTypography extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    tagName: string,
    size: oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']),
  };
  static defaultProps = {
    children: null,
    tagName: null,
    size: 1,
  };

  render() {
    const tagName = this.props.tagName || `h${this.props.size}`;

    return (
      <BaseTypography
        tagName={tagName}
        className={`mdc-typography--headline${this.props.size}`}
        {...omit(this.props, Object.keys(HeadlineTypography.propTypes))}
      >
        {this.props.children}
      </BaseTypography>
    );
  }
}

export default HeadlineTypography;
