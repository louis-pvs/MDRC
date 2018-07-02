import React, { PureComponent } from 'react';
import {
  oneOfType, arrayOf, node, bool, string, func,
} from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import {
  cssClasses, enums, usedProps, event,
} from './constants';

class ChipsItem extends PureComponent {
  ref = null;

  chips = null;

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
    const { onInteract } = this.props;
    onInteract();
  };

  onRemove = () => {
    const { onRemove } = this.props;
    onRemove();
  };

  init = (ref) => {
    if (ref && this.ref !== ref) {
      this.ref = ref;
      this.ref.addEventListener(event.INTERACT, this.onInteract);
      this.ref.addEventListener(event.REMOVE, this.onRemove);
    }
  };

  render() {
    const { selected, htmlTag: Tag, children } = this.props;
    const className = classnames(cssClasses.CHIP, {
      [cssClasses.SELECTED]: selected,
    });

    return (
      <Tag
        ref={this.init}
        className={className}
        role="button"
        tabIndex="0"
        {...omit(this.props, usedProps.ITEM)}
      >
        {children}
      </Tag>
    );
  }
}

export default ChipsItem;
