import React, { PureComponent } from 'react';

import BaseTypography from './BaseTypography';
import HeadlineTypography from './HeadlineTypography';
import './typography.scss';

class Typography extends PureComponent {
  static Headline = props => <HeadlineTypography {...props} />;

  render() {
    return <BaseTypography {...this.props} />;
  }
}

export default Typography;
