import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MDCRipple } from '@material/ripple';

import './card.scss';
import omit from '../utils/omit';

class CardMedia extends PureComponent {
  init = (ref) => {
    if (this.props.ripple) {
      this.ref = new MDCRipple(ref);
    }
  };
  render() {
    const className = classnames('mdc-card__primary-action', this.props.className);
    return (
      <div
        ref={this.init}
        className={className}
        {...omit(this.props, Object.keys(CardMedia.propTypes))}
      >
        {this.props.children}
      </div>
    );
  }
}

CardMedia.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node, PropTypes.string),
  ]),
  className: PropTypes.string,
  ripple: PropTypes.bool,
};

CardMedia.defaultProps = {
  children: null,
  className: null,
  ripple: true,
};

export default CardMedia;
