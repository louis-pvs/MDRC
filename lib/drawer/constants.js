export const cssClasses = {
  ROOT: 'mdc-drawer',
  CONTENT: 'mdc-drawer__content',
  DRAWER: 'mdc-drawer__drawer',
  HEADER_CONTENT: 'mdc-drawer__header-content',
  HEADER: 'mdc-drawer__header',
  PERMANENT: 'mdc-drawer--permanent',
  PERSISTENT: 'mdc-drawer--persistent',
  SPACER: 'mdc-drawer__toolbar-spacer',
  TEMPORARY: 'mdc-drawer--temporary',
};

export const enums = {
  DIV: 'div',
  HEADER: 'h5',
  NAV: 'nav',
  PERMANENT: 'permanent',
  PERSISTENT: 'persistent',
  TEMPORARY: 'temporary',
};

export const usedProps = {
  CLASSNAME: ['className'],
  CONTENT: ['appendClassToChild', 'children', 'className', 'htmlTag'],
  HEADER: ['children', 'className', 'htmlTag'],
  DRAWER: [
    'children',
    'className',
    'htmlTag',
    'isOpen',
    'onClose',
    'onOpen',
    enums.PERMANENT,
    enums.PERSISTENT,
    enums.TEMPORARY,
  ],
};

export const event = {
  TEMP_OPEN: 'MDCTemporaryDrawer:open',
  TEMP_CLOSE: 'MDCTemporaryDrawer:close',
  PERSIST_OPEN: 'MDCPersistentDrawer:open',
  PERSIST_CLOSE: 'MDCPersistentDrawer:close',
};
