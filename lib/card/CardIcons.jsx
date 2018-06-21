import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import './card.scss';
import omit from '../utils/omit';
import cloneChildWithClassName from '../utils/cloneChildWithClassName';

class CardIcons extends PureComponent {
  static propTypes = {
    appendClassToChild: bool,
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
  };
  static defaultProps = {
    appendClassToChild: true,
    children: null,
    className: null,
    htmlTag: 'div',
  };

  renderChild() {
    if (!this.props.appendClassToChild || !this.props.children) return this.props.children;
    return cloneChildWithClassName(
      this.props.children,
      classnames('mdc-card__action', 'mdc-card__action--icon'),
    );
  }

  render() {
    const className = classnames('mdc-card__icons', this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} {...omit(this.props, Object.keys(CardIcons.propTypes))}>
        {this.renderChild()}
      </Tag>
    );
  }
}

export default CardIcons;
