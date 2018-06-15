import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';

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
    children: oneOfType([node, string, arrayOf(node, string)]),
    ripple: bool,
  };
  static defaultProps = {
    children: null,
    ripple: true,
  };

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

export default Card;
