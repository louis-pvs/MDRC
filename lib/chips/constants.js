export const cssClasses = {
  CHECKMARK: 'mdc-chip__checkmark',
  CHIP: 'mdc-chip',
  CHOICE: 'mdc-chip-set--choice',
  FILTER: 'mdc-chip-set--filter',
  ICON_LEAD: 'mdc-chip__icon--leading',
  ICON_TRAIL: 'mdc-chip__icon--trailing',
  ICON: 'mdc-chip__icon',
  PATH: 'mdc-chip__checkmark-path',
  ROOT: 'mdc-chip-set',
  SELECTED: 'mdc-chip--selected',
  SVG: 'mdc-chip__checkmark-svg',
  TEXT: 'mdc-chip__text',
};

export const enums = {
  DIV: 'div',
  LEAD: 'lead',
  SPAN: 'span',
  TRAIL: 'trail',
};

export const usedProps = {
  CHIP: ['children,', 'className', 'choice', 'filter', 'htmlTag', 'onSelect'],
  CLASSNAME: ['classNames'],
  ICON: [enums.LEAD, enums.TRAIL, 'className', 'checkmark'],
  ITEM: ['children', 'className', 'htmlTag', 'leadingIcon', 'onInteract', 'onRemove'],
  TEXT: ['children', 'className', 'htmlTag'],
};

export const event = {
  INTERACT: 'MDCChip:interaction',
  REMOVE: 'MDCChip:removal',
};
