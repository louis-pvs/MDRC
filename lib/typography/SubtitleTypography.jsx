import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf, oneOf,
} from 'prop-types';

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
    htmlTag: `${enums.HEADER}${enums.HEADLINE_SIZE[4]}`,
    size: enums.HEADLINE_SIZE[4],
  };

  render() {
    const { size, children } = this.props;

    return (
      <BaseTypography
        className={`${cssClasses.SUBTITLE}${size}`}
        {...omit(this.props, usedProps.SUBTITLE)}
      >
        {children}
      </BaseTypography>
    );
  }
}

export default SubtitleTypography;
