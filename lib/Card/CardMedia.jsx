import React, { PureComponent } from 'react';
import { bool, oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';

import './card.scss';
import omit from '../utils/omit';

class CardMedia extends PureComponent {
  static propTypes = {
    absoluteContent: bool,
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
    sixteenByNine: bool,
    square: bool,
  };
  static defaultProps = {
    absoluteContent: true,
    children: null,
    className: null,
    sixteenByNine: false,
    square: false,
  };

  renderContent() {
    if (!this.props.absoluteContent) return this.props.children;
    return <div className="mdc-card__media-content">{this.props.children}</div>;
  }

  render() {
    const className = classnames(
      'mdc-card__media',
      {
        'mdc-card__media--16-9': this.props.sixteenByNine,
        'mdc-card__media--square': this.props.square,
      },
      this.props.className,
    );
    return (
      <div className={className} {...omit(this.props, Object.keys(CardMedia.propTypes))}>
        {this.renderContent()}
      </div>
    );
  }
}

export default CardMedia;
