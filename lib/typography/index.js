import React, { PureComponent } from 'react';

import BaseTypography from './BaseTypography';
import HeadlineTypography from './HeadlineTypography';
import SubtitleTypography from './SubtitleTypography';
import BodyTypography from './BodyTypography';
import './typography.scss';

class Typography extends PureComponent {
  static Headline = props => <HeadlineTypography {...props} />;
  static Subtitle = props => <SubtitleTypography {...props} />;
  static Body = props => <BodyTypography {...props} />;
  static Caption = props => (
    <BaseTypography className="mdc-typography--caption" tagName="span" {...props} />
  );
  static Button = props => (
    <BaseTypography className="mdc-typography--button" tagName="span" {...props} />
  );
  static Overline = props => (
    <BaseTypography className="mdc-typography--overline" tagName="span" {...props} />
  );

  render() {
    return <BaseTypography {...this.props} />;
  }
}

export default Typography;
