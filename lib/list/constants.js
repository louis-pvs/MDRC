export const cssClasses = {
  AVATAR: 'mdc-list--avatar-list',
  DENSE: 'mdc-list--dense',
  DIVIDER: 'mdc-list-divider',
  GRAPHIC: 'mdc-list-item__graphic',
  GROUP: 'mdc-list-group',
  INSET: 'mdc-list-divider--inset',
  ITEM_ACTIVATED: 'mdc-list-item--activated',
  ITEM_SELECTED: 'mdc-list-item--selected',
  ITEM: 'mdc-list-item',
  META: 'mdc-list-item__meta',
  NON_INTERACTIVE: 'mdc-list--non-interactive',
  PADDED: 'mdc-list-divider--padded',
  ROOT: 'mdc-list',
  SUBHEADER: 'mdc-list-group__subheader',
  TEXT_SECONDARY: 'mdc-list-item__secondary-text',
  TEXT: 'mdc-list-item__text',
  TWO_LINE: 'mdc-list--two-line',
};

export const enums = {
  DIV: 'div',
  HEADER: 'h5',
  LIST_ITEM: 'li',
  SPAN: 'span',
  UNORDER_LIST: 'ul',
};

export const usedProps = {
  DIVIDER: ['className', 'inset', 'padded', 'htmlTag'],
  GRAPHIC: ['children', 'className', 'meta', 'htmlTag'],
  GROUP: ['children', 'className', 'htmlTag'],
  ITEM: ['activated', 'children', 'className', 'selected', 'ripple', 'htmlTag'],
  LIST: ['avatar', 'children', 'className', 'dense', 'interactive', 'htmlTag', 'twoLine'],
  SUBHEADER: ['children', 'className', 'secondary', 'htmlTag'],
  TEXT: ['children', 'className', 'secondary', 'htmlTag'],
};
