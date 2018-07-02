import React, { PureComponent } from 'react';
import {
  node, string, oneOfType, arrayOf, bool, func,
} from 'prop-types';
import classnames from 'classnames';
import { MDCPersistentDrawer, MDCTemporaryDrawer } from '@material/drawer';

import omit from '../utils/omit';
import {
  cssClasses, enums, usedProps, event,
} from './constants';
import notTruthyWith from '../utils/notTruthyWith';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import './drawer.scss';

class Drawer extends PureComponent {
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

  ref = null;

  drawer = null;

  static propTypes = {
    children: oneOfType([node, arrayOf(node)]),
    className: string,
    htmlTag: string,
    isOpen: bool,
    onClose: func,
    onOpen: func,
    [enums.PERMANENT]: function validate(...validates) {
      return notTruthyWith([enums.PERSISTENT, [enums.TEMPORARY]], ...validates);
    },
    [enums.PERSISTENT]: function validate(...validates) {
      return notTruthyWith([[enums.PERMANENT], [enums.TEMPORARY]], ...validates);
    },
    [enums.TEMPORARY]: function validate(...validates) {
      return notTruthyWith([enums.PERSISTENT, [enums.PERMANENT]], ...validates);
    },
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

  componentWillReceiveProps(nextProps) {
    const { isOpen } = this.props;
    if (this.drawer && isOpen !== nextProps.isOpen) {
      this.drawer.open = nextProps.isOpen;
    }
  }

  componentWillUnmount() {
    if (this.ref) {
      const { [enums.PERSISTENT]: persistent, [enums.TEMPORARY]: temporary } = this.props;
      if (persistent) {
        this.ref.removeEventListener(event.PERSIST_OPEN, this.onOpen);
        this.ref.removeEventListener(event.PERSIST_CLOSE, this.onClose);
      } else if (temporary) {
        this.ref.removeEventListener(event.TEMP_OPEN, this.onOpen);
        this.ref.removeEventListener(event.TEMP_CLOSE, this.onClose);
      }
    }
  }

  onOpen = () => {
    const { onOpen } = this.props;
    onOpen();
  };

  onClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  init = (ref) => {
    if (ref && this.ref !== ref) {
      const { [enums.PERSISTENT]: persistent, [enums.TEMPORARY]: temporary, isOpen } = this.props;
      this.ref = ref;
      if (persistent) {
        this.drawer = new MDCPersistentDrawer(ref);
        this.ref.addEventListener(event.PERSIST_OPEN, this.onOpen);
        this.ref.addEventListener(event.PERSIST_CLOSE, this.onClose);
      } else if (temporary) {
        this.drawer = new MDCTemporaryDrawer(ref);
        this.ref.addEventListener(event.TEMP_OPEN, this.onOpen);
        this.ref.addEventListener(event.TEMP_CLOSE, this.onClose);
      }
      if (this.drawer) {
        this.drawer.open = isOpen;
      }
    }
  };

  render() {
    const {
      [enums.PERMANENT]: permanent,
      [enums.PERSISTENT]: persistent,
      [enums.TEMPORARY]: temporary,
      children,
      className,
      htmlTag: Tag,
    } = this.props;
    const drawerClassName = classnames(cssClasses.ROOT, {
      [cssClasses.PERMANENT]: permanent,
      [cssClasses.PERSISTENT]: persistent,
      [cssClasses.TEMPORARY]: temporary,
    });
    const contentClassName = classnames(cssClasses.DRAWER, className);

    return (
      <aside className={drawerClassName} ref={this.init}>
        <Tag className={contentClassName} {...omit(this.props, usedProps.DRAWER)}>
          {children}
        </Tag>
      </aside>
    );
  }
}

export default Drawer;
