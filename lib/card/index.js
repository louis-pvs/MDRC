import React, { PureComponent } from 'react';
import { oneOfType, node, arrayOf, bool } from 'prop-types';

import './card.scss';
import omit from '../utils/omit';
import CardBody from './CardBody';
import CardPrimaryAction from './CardPrimaryAction';
import CardMedia from './CardMedia';
import CardActions from './CardActions';
import CardButtons from './CardButtons';
import CardIcons from './CardIcons';

class Card extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    ripple: bool,
  };
  static defaultProps = {
    children: null,
    ripple: true,
  };

  static PrimaryAction = CardPrimaryAction;
  static Media = CardMedia;
  static Actions = CardActions;
  static Buttons = CardButtons;
  static Icons = CardIcons;

  render() {
    return (
      <CardBody {...omit(this.props, Object.keys(Card.propTypes))}>{this.props.children}</CardBody>
    );
  }
}

export default Card;
