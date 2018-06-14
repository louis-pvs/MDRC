import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './card.scss';
import omit from '../utils/omit';

class CardActions extends PureComponent {
  cloneChild = (child, key) => {
    if (!child || !child.props) return child;
    const className = classnames(child.props.className, 'mdc-card__action');
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
    const className = classnames(
      {
        'mdc-card__actions': true,
        'mdc-card__actions--full-bleed': this.props.full,
      },
      this.props.className,
    );
    return (
      <div className={className} {...omit(this.props, Object.keys(CardActions.propTypes))}>
        {this.renderChild()}
      </div>
    );
  }
}

CardActions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node, PropTypes.string),
  ]),
  className: PropTypes.string,
  full: PropTypes.bool,
  appendClassToChild: PropTypes.bool,
};

CardActions.defaultProps = {
  children: null,
  className: null,
  full: false,
  appendClassToChild: true,
};

export default CardActions;
