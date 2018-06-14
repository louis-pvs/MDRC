import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './card.scss';
import omit from '../utils/omit';
import CardBody from './CardBody';
import CardPrimaryAction from './CardPrimaryAction';
import CardMedia from './CardMedia';
import CardActions from './CardActions';
import CardButtons from './CardButtons';
import CardIcons from './CardIcons';

class Card extends PureComponent {
  static PrimaryAction = props => <CardPrimaryAction {...props} />;
  static Media = props => <CardMedia {...props} />;
  static Actions = props => <CardActions {...props} />;
  static Buttons = props => <CardButtons {...props} />;
  static Icons = props => <CardIcons {...props} />;

  render() {
    return (
      <CardBody {...omit(this.props, Object.keys(Card.propTypes))}>{this.props.children}</CardBody>
    );
  }
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node, PropTypes.string),
  ]),
  ripple: PropTypes.bool,
};

Card.defaultProps = {
  children: null,
  ripple: true,
};

export default Card;
