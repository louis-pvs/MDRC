import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, oneOf } from 'prop-types';

import BaseTypography from './BaseTypography';
import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';

class SubtitleTypography extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    htmlTag: string,
    size: oneOf(enums.SUBTITLE_SIZE),
  };
  static defaultProps = {
    children: null,
    htmlTag: enums.DEFAULT_HEADER,
    size: enums.SUBTITLE_SIZE[0],
  };

  render() {
    const { htmlTag, size } = this.props;

    return (
      <BaseTypography
        htmlTag={htmlTag}
        className={`${cssClasses.SUBTITLE}${size}`}
        {...omit(this.props, usedProps.SUBTITLE)}
      >
        {this.props.children}
      </BaseTypography>
    );
  }
}

export default SubtitleTypography;
