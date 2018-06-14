import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './card.scss';
import omit from '../utils/omit';

class CardIcons extends PureComponent {
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
    if (!this.props.appendClassToChild) return this.props.children;
    if (!this.props.children) return null;
    if (Array.isArray(this.props.children)) {
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

CardIcons.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node, PropTypes.string),
  ]),
  className: PropTypes.string,
  appendClassToChild: PropTypes.bool,
};

CardIcons.defaultProps = {
  children: null,
  className: null,
  appendClassToChild: true,
};

export default CardIcons;
