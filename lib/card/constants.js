export const cssClasses = {
  ROOT: 'mdc-card',
  ABSOLUTE: 'mdc-card__media-content',
  ACTION: 'mdc-card__action',
  ACTIONS: 'mdc-card__actions',
  BUTTON: 'mdc-card__action--button',
  BUTTONS: 'mdc-card__buttons',
  FULL: 'mdc-card__actions--full-bleed',
  ICON: 'mdc-card__action--icon',
  ICONS: 'mdc-card__icons',
  MEDIA_16_9: 'mdc-card__media--16-9',
  MEDIA_SQUARE: 'mdc-card__media--square',
  MEDIA: 'mdc-card__media',
  OUTLINED: 'mdc-card--outlined',
  PRIMARY_ACTION: 'mdc-card__primary-action',
};

export const enums = {
  DIV: 'div',
  SQUARE: 'square',
  SIXTEEN_NINE: 'sixteenByNine',
};

export const usedProps = {
  ACTIONS: ['children', 'className', 'full', 'htmlTag'],
  BODY: ['children', 'className', 'htmlTag', 'outlined'],
  BUTTONS: ['children', 'className', 'htmlTag'],
  CLASSNAME: ['className'],
  ICONS: ['children', 'className', 'htmlTag'],
  MEDIA: ['absoluteContent', 'children', 'className', 'htmlTag', enums.SIXTEEN_NINE, enums.SQUARE],
  PRIMARY_ACTION: ['children', 'className', 'htmlTag', 'ripple'],
};
