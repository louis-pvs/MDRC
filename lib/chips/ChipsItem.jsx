import React, { PureComponent, cloneElement, isValidElement } from 'react';
import { oneOfType, arrayOf, node, bool, string, func } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class ChipsItem extends PureComponent {
  static propTypes = {
    checkable: bool,
    children: oneOfType([node, arrayOf(node)]),
    htmlTag: string,
    leadingIcon: node,
    onInteract: func,
    onRemove: func,
    selected: bool,
    trailingIcon: node,
  };
  static defaultProps = {
    checkable: false,
    children: null,
    htmlTag: 'div',
    leadingIcon: null,
    onInteract: () => {},
    onRemove: () => {},
    selected: false,
    trailingIcon: null,
  };

  componentWillUnmount() {
    this.ref.removeEventListener('MDCChip:interaction', this.onInteract);
    this.ref.removeEventListener('MDCChip:removal', this.onRemove);
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
      this.ref.addEventListener('MDCChip:interaction', this.onInteract);
      this.ref.addEventListener('MDCChip:removal', this.onRemove);
    }
  };

  renderChecker = () => {
    if (!this.props.checkable) return null;
    return (
      <div className="mdc-chip__checkmark">
        <svg className="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
          <path
            className="mdc-chip__checkmark-path"
            fill="none"
            stroke="black"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
          />
        </svg>
      </div>
    );
  };

  renderLeadingIcon() {
    const { leadingIcon } = this.props;
    if (isValidElement(leadingIcon)) {
      if (!leadingIcon.props) return leadingIcon;

      const className = classnames(
        'mdc-chip__icon',
        'mdc-chip__icon--leading',
        leadingIcon.props.className,
      );
      return cloneElement(leadingIcon, { className });
    }
    return null;
  }

  renderTrailingIcon() {
    const { trailingIcon } = this.props;
    if (isValidElement(trailingIcon)) {
      if (!trailingIcon.props) return trailingIcon;

      const className = classnames(
        'mdc-chip__icon',
        'mdc-chip__icon--trailing',
        trailingIcon.props.className,
      );
      return cloneElement(trailingIcon, { className });
    }
    return null;
  }

  render() {
    const className = classnames('mdc-chip', {
      'mdc-chip--selected': this.props.selected,
    });
    const Tag = this.props.htmlTag;

    return (
      <Tag
        ref={this.init}
        className={className}
        role="button"
        tabIndex="0"
        {...omit(this.props, Object.keys(ChipsItem.propTypes))}
      >
        {this.renderLeadingIcon()}
        {this.renderChecker()}
        <div className="mdc-chip__text">{this.props.children}</div>
        {this.renderTrailingIcon()}
      </Tag>
    );
  }
}

export default ChipsItem;
