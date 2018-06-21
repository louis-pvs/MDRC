import React, { PureComponent } from 'react';
import { node, string, oneOfType, arrayOf, bool, func } from 'prop-types';
import classnames from 'classnames';
import { MDCPersistentDrawer, MDCTemporaryDrawer } from '@material/drawer';

import omit from '../utils/omit';
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
    permanent: (...validates) => notTruthyWith(['persistent', 'temporary'], ...validates),
    persistent: (...validates) => notTruthyWith(['permanent', 'temporary'], ...validates),
    temporary: (...validates) => notTruthyWith(['persistent', 'permanent'], ...validates),
  };
  static defaultProps = {
    children: null,
    className: null,
    htmlTag: 'div',
    isOpen: false,
    onClose: () => {},
    onOpen: () => {},
    permanent: false,
    persistent: false,
    temporary: false,
  };

  static Header = DrawerHeader;
  static Content = DrawerContent;
  static Spacer = function DrawerSpacer(props) {
    return (
      <div
        className={classnames('mdc-drawer__toolbar-spacer', props.className)}
        {...omit(props, ['className'])}
      />
    );
  };

  componentWillReceiveProps(nextProps) {
    if (this.drawer && this.props.isOpen !== nextProps.isOpen) {
      this.drawer.open = nextProps.isOpen;
    }
  }
  componentWillUnmount() {
    if (this.props.temporary && this.ref) {
      this.ref.removeEventListener('MDCTemporaryDrawer:open', this.onOpen);
      this.ref.removeEventListener('MDCTemporaryDrawer:close', this.onClose);
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
      if (this.props.persistent) {
        this.drawer = new MDCPersistentDrawer(ref);
        this.ref.addEventListener('MDCPersistentDrawer:open', this.onOpen);
        this.ref.addEventListener('MDCPersistentDrawer:close', this.onClose);
      } else if (this.props.temporary) {
        this.drawer = new MDCTemporaryDrawer(ref);
        this.ref.addEventListener('MDCTemporaryDrawer:open', this.onOpen);
        this.ref.addEventListener('MDCTemporaryDrawer:close', this.onClose);
      }
      if (this.drawer) {
        this.drawer.open = this.props.isOpen;
      }
    }
  };

  render() {
    const drawerClassName = classnames('mdc-drawer', {
      'mdc-drawer--permanent': this.props.permanent,
      'mdc-drawer--persistent': this.props.persistent,
      'mdc-drawer--temporary': this.props.temporary,
    });
    const contentClassName = classnames('mdc-drawer__drawer', this.props.className);
    const Tag = this.props.htmlTag;

    return (
      <aside className={drawerClassName} ref={this.init}>
        <Tag className={contentClassName} {...omit(this.props, Object.keys(Drawer.propTypes))}>
          {this.props.children}
        </Tag>
      </aside>
    );
  }
}

export default Drawer;
