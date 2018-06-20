import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, oneOf } from 'prop-types';

import BaseTypography from './BaseTypography';
import omit from '../utils/omit';

class BodyTypography extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    htmlTag: string,
    size: oneOf([1, 2, '1', '2']),
  };
  static defaultProps = {
    children: null,
    htmlTag: 'p',
    size: 1,
  };

  render() {
    const { htmlTag, size } = this.props;

    return (
      <BaseTypography
        htmlTag={htmlTag}
        className={`mdc-typography--body${size}`}
        {...omit(this.props, Object.keys(BodyTypography.propTypes))}
      >
        {this.props.children}
      </BaseTypography>
    );
  }
}

export default BodyTypography;
