import React, { PureComponent, cloneElement } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import './card.scss';
import omit from '../utils/omit';

class CardIcons extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
    appendClassToChild: bool,
  };
  static defaultProps = {
    children: null,
    className: null,
    appendClassToChild: true,
  };

  cloneChild = (child, key) => {
    if (!child || !child.props) return child;
    const className = classnames(
      child.props.className,
      'mdc-card__action',
      'mdc-card__action--icon',
    );
    const props = { className, key };
    return cloneElement(child, props);
  };

  renderChild() {
    if (!this.props.appendClassToChild || !this.props.children) return this.props.children;
    else if (Array.isArray(this.props.children)) {
      return this.props.children.map(this.cloneChild);
    }
    return this.cloneChild(this.props.children);
  }

  render() {
    const className = classnames('mdc-card__icons', this.props.className);
    return (
      <div className={className} {...omit(this.props, Object.keys(CardIcons.propTypes))}>
        {this.renderChild()}
      </div>
    );
  }
}

export default CardIcons;
