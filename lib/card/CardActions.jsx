import React, { PureComponent, cloneElement, isValidElement } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import './card.scss';
import omit from '../utils/omit';

class CardActions extends PureComponent {
  static propTypes = {
    appendClassToChild: bool,
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    full: bool,
    htmlTag: string,
  };
  static defaultProps = {
    appendClassToChild: true,
    children: null,
    className: null,
    full: false,
    htmlTag: 'div',
  };

  cloneChild = (child, key) => {
    if (isValidElement(child)) {
      if (!child.props) return cloneElement(child, { key });

      const className = classnames('mdc-card__action', child.props.className);
      return cloneElement(child, { className, key });
    }
    return null;
  };

  renderChild() {
    if (!this.props.appendClassToChild || !this.props.children) return this.props.children;
    else if (Array.isArray(this.props.children)) {
      return this.props.children.map(this.cloneChild);
    }
    return this.cloneChild(this.props.children);
  }

  render() {
    const className = classnames(
      {
        'mdc-card__actions': true,
        'mdc-card__actions--full-bleed': this.props.full,
      },
      this.props.className,
    );
    const Tag = this.props.htmlTag;

    return (
      <Tag className={className} {...omit(this.props, Object.keys(CardActions.propTypes))}>
        {this.renderChild()}
      </Tag>
    );
  }
}

export default CardActions;
