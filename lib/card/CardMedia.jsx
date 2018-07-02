import React, { PureComponent } from 'react';
import {
  oneOfType, node, string, arrayOf,
} from 'prop-types';
import classnames from 'classnames';

import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';
import notTruthyWith from '../utils/notTruthyWith';

class CardMedia extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
    [enums.SIXTEEN_NINE]: function validate(...validates) {
      return notTruthyWith([enums.SQUARE], ...validates);
    },
    [enums.SQUARE]: function validate(...validates) {
      return notTruthyWith([enums.SIXTEEN_NINE], ...validates);
    },
  };

  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.DIV,
    [enums.SIXTEEN_NINE]: false,
    [enums.SQUARE]: false,
  };

  render() {
    const {
      [enums.SIXTEEN_NINE]: sixteenByNine,
      [enums.SQUARE]: square,
      children,
      className,
      htmlTag: Tag,
    } = this.props;
    const classNames = classnames(cssClasses.MEDIA, {
      [cssClasses.MEDIA_16_9]: sixteenByNine,
      [cssClasses.MEDIA_SQUARE]: square,
    });
    const mediaContent = classnames(cssClasses.ABSOLUTE, className);

    return (
      <div className={classNames}>
        <Tag className={mediaContent} {...omit(this.props, usedProps.MEDIA)}>
          {children}
        </Tag>
      </div>
    );
  }
}

export default CardMedia;
