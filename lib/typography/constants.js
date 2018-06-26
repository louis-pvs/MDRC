export const cssClasses = {
  ROOT: 'mdc-typography',
  BODY: 'mdc-typography--body',
  BUTTON: 'mdc-typography--button',
  CAPTION: 'mdc-typography--caption',
  HEADLINE: 'mdc-typography--headline',
  OVERLINE: 'mdc-typography--overline',
  SUBTITLE: 'mdc-typography--subtitle',
};

export const enums = {
  PARAGRAPH: 'p',
  SPAN: 'span',
  HEADER: 'h',
  DEFAULT_HEADER: 'h5',
  HEADLINE_SIZE: [1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6'],
  BODY_SIZE: [1, 2, '1', '2'],
  SUBTITLE_SIZE: [1, 2, '1', '2'],
};

export const usedProps = {
  BASE: ['children', 'className', 'htmlTag'],
  BODY: ['children', 'htmlTag', 'size'],
  CLASSNAME: ['className'],
  HEADLINE: ['children', 'htmlTag', 'size'],
  SUBTITLE: ['children', 'htmlTag', 'size'],
};
