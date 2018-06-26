import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';
import ListItem from './ListItem';
import ListText from './ListText';
import ListGroup from './ListGroup';
import ListSubheader from './ListSubheader';
import ListDivider from './ListDivider';
import ListGraphic from './ListGraphic';
import './list.scss';

class List extends PureComponent {
  static propTypes = {
    avatar: bool,
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    dense: bool,
    interactive: bool,
    htmlTag: string,
    twoLine: bool,
  };
  static defaultProps = {
    avatar: false,
    children: null,
    className: null,
    dense: false,
    interactive: true,
    htmlTag: enums.UNORDER_LIST,
    twoLine: false,
  };

  static Item = ListItem;
  static Text = ListText;
  static Group = ListGroup;
  static Subheader = ListSubheader;
  static Divider = ListDivider;
  static Graphic = ListGraphic;
  static Meta = function ListMeta(props) {
    return <ListGraphic meta {...props} />;
  };

  render() {
    const className = classnames(
      cssClasses.ROOT,
      {
        [cssClasses.NON_INTERACTIVE]: !this.props.interactive,
        [cssClasses.DENSE]: this.props.dense,
        [cssClasses.AVATAR]: this.props.avatar,
        [cssClasses.TWO_LINE]: this.props.twoLine,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;
    return (
      <Tag className={className} {...omit(this.props, usedProps.LIST)}>
        {this.props.children}
      </Tag>
    );
  }
}

export default List;
