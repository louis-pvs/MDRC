import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, oneOf } from 'prop-types';

import BaseTypography from './BaseTypography';
import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';

class HeadlineTypography extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    htmlTag: string,
    size: oneOf(enums.HEADLINE_SIZE),
  };
  static defaultProps = {
    children: null,
    htmlTag: null,
    size: enums.HEADLINE_SIZE[0],
  };

  render() {
    const htmlTag = this.props.htmlTag || `${enums.HEADER}${this.props.size}`;

    return (
      <BaseTypography
        htmlTag={htmlTag}
        className={`${cssClasses.HEADLINE}${this.props.size}`}
        {...omit(this.props, usedProps.HEADLINE)}
      >
        {this.props.children}
      </BaseTypography>
    );
  }
}

export default HeadlineTypography;
