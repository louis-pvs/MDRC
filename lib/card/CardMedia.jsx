import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';

import { cssClasses, usedProps, enums } from './constants';
import omit from '../utils/omit';
import notTruthyWith from '../utils/notTruthyWith';

class CardMedia extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
    [enums.SIXTEEN_NINE]: (...validates) => notTruthyWith([enums.SQUARE], ...validates),
    [enums.SQUARE]: (...validates) => notTruthyWith([enums.SIXTEEN_NINE], ...validates),
  };
  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.DIV,
    [enums.SIXTEEN_NINE]: false,
    [enums.SQUARE]: false,
  };

  render() {
    const mediaClasses = classnames(cssClasses.MEDIA, {
      [cssClasses.MEDIA_16_9]: this.props[enums.SIXTEEN_NINE],
      [cssClasses.MEDIA_SQUARE]: this.props[enums.SQUARE],
    });
    const mediaContent = classnames(cssClasses.ABSOLUTE, this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <div className={mediaClasses}>
        <Tag className={mediaContent} {...omit(this.props, usedProps.MEDIA)}>
          {this.props.children}
        </Tag>
      </div>
    );
  }
}

export default CardMedia;
