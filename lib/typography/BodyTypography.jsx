import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf, oneOf,
} from 'prop-types';

import BaseTypography from './BaseTypography';
import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';

class BodyTypography extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    htmlTag: string,
    size: oneOf(enums.BODY_SIZE),
  };

  static defaultProps = {
    children: null,
    htmlTag: enums.PARAGRAPH,
    size: enums.BODY_SIZE[0],
  };

  render() {
    const { size, children } = this.props;

    return (
      <BaseTypography
        className={`${cssClasses.BODY}${size}`}
        {...omit(this.props, usedProps.BODY)}
      >
        {children}
      </BaseTypography>
    );
  }
}

export default BodyTypography;
