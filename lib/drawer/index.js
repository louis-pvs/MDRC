import React, { PureComponent } from 'react';
import { node, string, oneOfType, arrayOf, bool, func } from 'prop-types';
import classnames from 'classnames';
import { MDCPersistentDrawer, MDCTemporaryDrawer } from '@material/drawer';

import omit from '../utils/omit';
import { cssClasses, enums, usedProps, event } from './constants';
import notTruthyWith from '../utils/notTruthyWith';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import './drawer.scss';

class Drawer extends PureComponent {
  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
    isOpen: bool,
    onClose: func,
    onOpen: func,
    [enums.PERMANENT]: (...validates) =>
      notTruthyWith([enums.PERSISTENT, [enums.TEMPORARY]], ...validates),
    [enums.PERSISTENT]: (...validates) =>
      notTruthyWith([[enums.PERMANENT], [enums.TEMPORARY]], ...validates),
    [enums.TEMPORARY]: (...validates) =>
      notTruthyWith([enums.PERSISTENT, [enums.PERMANENT]], ...validates),
  };
  static defaultProps = {
    children: null,
    className: null,
    htmlTag: enums.DIV,
    isOpen: false,
    onClose: () => {},
    onOpen: () => {},
    [enums.PERMANENT]: false,
    [enums.PERSISTENT]: false,
    [enums.TEMPORARY]: false,
  };

  static Header = DrawerHeader;
  static Content = DrawerContent;
  static Spacer = function DrawerSpacer(props) {
    return (
      <div
        className={classnames(cssClasses.SPACER, props.className)}
        {...omit(props, usedProps.CLASSNAME)}
      />
    );
  };

  componentWillReceiveProps(nextProps) {
    if (this.drawer && this.props.isOpen !== nextProps.isOpen) {
      this.drawer.open = nextProps.isOpen;
    }
  }
  componentWillUnmount() {
    if (this.ref) {
      if (this.props[enums.PERSISTENT]) {
        this.ref.removeEventListener(event.PERSIST_OPEN, this.onOpen);
        this.ref.removeEventListener(event.PERSIST_CLOSE, this.onClose);
      } else if (this.props[enums.TEMPORARY]) {
        this.ref.removeEventListener(event.TEMP_OPEN, this.onOpen);
        this.ref.removeEventListener(event.TEMP_CLOSE, this.onClose);
      }
    }
  }

  onOpen = () => {
    this.props.onOpen();
  };
  onClose = () => {
    this.props.onClose();
  };

  ref = null;
  drawer = null;
  init = (ref) => {
    if (ref && this.ref !== ref) {
      this.ref = ref;
      if (this.props[enums.PERSISTENT]) {
        this.drawer = new MDCPersistentDrawer(ref);
        this.ref.addEventListener(event.PERSIST_OPEN, this.onOpen);
        this.ref.addEventListener(event.PERSIST_CLOSE, this.onClose);
      } else if (this.props[enums.TEMPORARY]) {
        this.drawer = new MDCTemporaryDrawer(ref);
        this.ref.addEventListener(event.TEMP_OPEN, this.onOpen);
        this.ref.addEventListener(event.TEMP_CLOSE, this.onClose);
      }
      if (this.drawer) {
        this.drawer.open = this.props.isOpen;
      }
    }
  };

  render() {
    const drawerClassName = classnames(cssClasses.ROOT, {
      [cssClasses.PERMANENT]: this.props[enums.PERMANENT],
      [cssClasses.PERSISTENT]: this.props[enums.PERSISTENT],
      [cssClasses.TEMPORARY]: this.props[enums.TEMPORARY],
    });
    const contentClassName = classnames(cssClasses.DRAWER, this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <aside className={drawerClassName} ref={this.init}>
        <Tag className={contentClassName} {...omit(this.props, usedProps.DRAWER)}>
          {this.props.children}
        </Tag>
      </aside>
    );
  }
}

export default Drawer;
