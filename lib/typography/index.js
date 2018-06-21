import React, { PureComponent } from 'react';
import classnames from 'classnames';

import BaseTypography from './BaseTypography';
import HeadlineTypography from './HeadlineTypography';
import SubtitleTypography from './SubtitleTypography';
import BodyTypography from './BodyTypography';
import omit from '../utils/omit';
import './typography.scss';

class Typography extends PureComponent {
  static Headline = HeadlineTypography;
  static Subtitle = SubtitleTypography;
  static Body = BodyTypography;
  static Caption = function CaptionTypography(props) {
    return (
      <BaseTypography
        className={classnames('mdc-typography--caption', props.className)}
        htmlTag="span"
        {...omit(props, ['className'])}
      />
    );
  };
  static Button = function ButtonTypography(props) {
    return (
      <BaseTypography
        className={classnames('mdc-typography--button', props.className)}
        htmlTag="span"
        {...omit(props, ['className'])}
      />
    );
  };
  static Overline = function OverlineTypography(props) {
    return (
      <BaseTypography
        className={classnames('mdc-typography--overline', props.className)}
        htmlTag="span"
        {...omit(props, ['className'])}
      />
    );
  };

  render() {
    return <BaseTypography {...this.props} />;
  }
}

export default Typography;
