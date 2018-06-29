import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './card.scss';
import omit from '../utils/omit';
import Button from '../button';
import Icon from '../icon';
import CardBody from './CardBody';
import CardPrimaryAction from './CardPrimaryAction';
import CardMedia from './CardMedia';
import CardActions from './CardActions';
import CardButtons from './CardButtons';
import CardIcons from './CardIcons';

import { cssClasses, usedProps } from './constants';

class Card extends PureComponent {
  static PrimaryAction = CardPrimaryAction;

  static Media = CardMedia;

  static Actions = CardActions;

  static Buttons = CardButtons;

  static Button = function CardButton(props) {
    return (
      <Button
        className={classnames(cssClasses.ACTION, cssClasses.BUTTON, props.className)}
        {...omit(props, usedProps.CLASSNAME)}
      />
    );
  };

  static Icon = function CardButton(props) {
    return (
      <Icon
        className={classnames(cssClasses.ACTION, cssClasses.ICON, props.className)}
        {...omit(props, usedProps.CLASSNAME)}
      />
    );
  };

  static Icons = CardIcons;

  render() {
    return <CardBody {...this.props} />;
  }
}

export default Card;
