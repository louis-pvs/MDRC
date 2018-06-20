import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
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
    htmlTag: 'ul',
    twoLine: false,
  };

  static Item = props => <ListItem {...props} />;
  static Text = props => <ListText {...props} />;
  static Group = props => <ListGroup {...props} />;
  static Subheader = props => <ListSubheader {...props} />;
  static Divider = props => <ListDivider {...props} />;
  static Graphic = props => <ListGraphic {...props} />;
  static Meta = props => <ListGraphic meta {...props} />;

  render() {
    const className = classnames(
      'mdc-list',
      {
        'mdc-list--non-interactive': !this.props.interactive,
        'mdc-list--dense': this.props.dense,
        'mdc-list--avatar-list': this.props.avatar,
        'mdc-list--two-line': this.props.twoLine,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;
    return (
      <Tag className={className} {...omit(this.props, Object.keys(List.propTypes))}>
        {this.props.children}
      </Tag>
    );
  }
}

export default List;
