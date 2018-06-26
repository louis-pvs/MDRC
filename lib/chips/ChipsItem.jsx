import React, { PureComponent } from 'react';
import { oneOfType, arrayOf, node, bool, string, func } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, enums, usedProps, event } from './constants';

class ChipsItem extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
    onInteract: func,
    onRemove: func,
    selected: bool,
  };
  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.DIV,
    onInteract: () => {},
    onRemove: () => {},
    selected: false,
  };

  componentWillUnmount() {
    if (this.ref) {
      this.ref.removeEventListener(event.INTERACT, this.onInteract);
      this.ref.removeEventListener(event.REMOVE, this.onRemove);
    }
  }

  onInteract = () => {
    this.props.onInteract();
  };

  onRemove = () => {
    this.props.onRemove();
  };

  ref = null;
  chips = null;
  init = (ref) => {
    if (ref && this.ref !== ref) {
      this.ref = ref;
      this.ref.addEventListener(event.INTERACT, this.onInteract);
      this.ref.addEventListener(event.REMOVE, this.onRemove);
    }
  };

  render() {
    const className = classnames(cssClasses.CHIP, {
      [cssClasses.SELECTED]: this.props.selected,
    });
    const Tag = this.props.htmlTag;

    return (
      <Tag
        ref={this.init}
        className={className}
        role="button"
        tabIndex="0"
        {...omit(this.props, usedProps.ITEM)}
      >
        {this.props.children}
      </Tag>
    );
  }
}

export default ChipsItem;
