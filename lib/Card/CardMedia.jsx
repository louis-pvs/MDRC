import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './card.scss';
import omit from '../utils/omit';

class CardMedia extends PureComponent {
  renderContent() {
    if (!this.props.absoluteContent) return this.props.children;
    return <div className="mdc-card__media-content">{this.props.children}</div>;
  }
  render() {
    const className = classnames(
      {
        'mdc-card__media': true,
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

CardMedia.propTypes = {
  absoluteContent: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node, PropTypes.string),
  ]),
  className: PropTypes.string,
  sixteenByNine: PropTypes.bool,
  square: PropTypes.bool,
};

CardMedia.defaultProps = {
  absoluteContent: true,
  children: null,
  className: null,
  sixteenByNine: false,
  square: false,
};

export default CardMedia;
