import React, { PureComponent } from 'react';
import classnames from 'classnames';

import BaseTypography from './BaseTypography';
import HeadlineTypography from './HeadlineTypography';
import SubtitleTypography from './SubtitleTypography';
import BodyTypography from './BodyTypography';
import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';
import './typography.scss';

class Typography extends PureComponent {
  static Headline = HeadlineTypography;
  static Subtitle = SubtitleTypography;
  static Body = BodyTypography;
  static Caption = function CaptionTypography(props) {
    return (
      <BaseTypography
        className={classnames(cssClasses.CAPTION, props.className)}
        htmlTag={enums.SPAN}
        {...omit(props, usedProps.CLASSNAME)}
      />
    );
  };
  static Button = function ButtonTypography(props) {
    return (
      <BaseTypography
        className={classnames(cssClasses.BUTTON, props.className)}
        htmlTag={enums.SPAN}
        {...omit(props, usedProps.CLASSNAME)}
      />
    );
  };
  static Overline = function OverlineTypography(props) {
    return (
      <BaseTypography
        className={classnames(cssClasses.OVERLINE, props.className)}
        htmlTag={enums.SPAN}
        {...omit(props, usedProps.CLASSNAME)}
      />
    );
  };

  render() {
    return <BaseTypography {...this.props} />;
  }
}

export default Typography;
