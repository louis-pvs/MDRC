import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './card.scss';
import omit from '../utils/omit';

class CardBody extends PureComponent {
  render() {
    const className = classnames({
      'mdc-card': true,
      'mdc-card--outlined': this.props.outlined,
    }, this.props.className);
    return (
      <div className={className} {...omit(this.props, Object.keys(CardBody.propTypes))}>
        {this.props.children}
      </div>
    );
  }
}

CardBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node, PropTypes.string),
  ]),
  className: PropTypes.string,
  outlined: PropTypes.bool,
};

CardBody.defaultProps = {
  children: null,
  className: null,
  outlined: false,
};

export default CardBody;
