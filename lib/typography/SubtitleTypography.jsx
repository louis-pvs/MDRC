import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, oneOf } from 'prop-types';

import BaseTypography from './BaseTypography';
import omit from '../utils/omit';

class SubtitleTypography extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    htmlTag: string,
    size: oneOf([1, 2, '1', '2']),
  };
  static defaultProps = {
    children: null,
    htmlTag: 'h5',
    size: 1,
  };

  render() {
    const { htmlTag, size } = this.props;

    return (
      <BaseTypography
        htmlTag={htmlTag}
        className={`mdc-typography--subtitle${size}`}
        {...omit(this.props, Object.keys(SubtitleTypography.propTypes))}
      >
        {this.props.children}
      </BaseTypography>
    );
  }
}

export default SubtitleTypography;
