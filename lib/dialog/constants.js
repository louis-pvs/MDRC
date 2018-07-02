export const cssClasses = {
  ROOT: 'mdc-dialog',
  ACCEPT: 'mdc-dialog__footer__button--accept',
  ACTION: 'mdc-dialog__action',
  BACKDROP: 'mdc-dialog__backdrop',
  BODY: 'mdc-dialog__body',
  BUTTON: 'dialog__footer__button',
  CANCEL: 'mdc-dialog__footer__button--cancel',
  SCROLL: 'mdc-dialog__body--scrollable',
  SURFACE: 'mdc-dialog__surface',
  FOOTER: 'mdc-dialog__footer',
  TITLE: 'mdc-dialog__header__title',
};

export const enums = {
  ACCEPT: 'accept',
  ASIDE: 'aside',
  CANCEL: 'cancel',
  SECTION: 'section',
  HEADER: 'h5',
};

export const usedProps = {
  DIALOG: ['activateBy', 'backdrop', 'children', 'className', 'htmlTag', 'onAccept', 'onCancel'],
  BODY: ['children', 'className', 'htmlTag', 'scrollable'],
  BUTTON: [enums.ACCEPT, enums.CANCEL, 'action', 'className'],
  FOOTER: ['children', 'className', 'htmlTag'],
  HEADER: ['children', 'className', 'htmlTag'],
};

export const event = {
  ACCEPT: 'MDCDialog:accept',
  CANCEL: 'MDCDialog:cancel',
};

export const target = {
  LABEL: 'my-mdc-dialog-label',
  DESC: 'my-mdc-dialog-description',
};
