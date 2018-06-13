# Button component
<!-- TOC -->

- [Button component](#button-component)
  - [Basic usage](#basic-usage)
  - [Using custom icon](#using-custom-icon)
  - [Controlling Fab position](#controlling-fab-position)
  - [Props](#props)

<!-- /TOC -->

## Basic usage
```javascript
import { Fab } from 'mrcw';

const App = () => {
  return (
    <div>
      <Fab arial-label="More Options" iconName="more_horiz" />
    </div>
  )
};
```

## Using custom icon
Example below is equivalent with [Basic usage](#basic-usage), adding `className="mdc-fab__icon"` manually to the Icon

```javascript
import { Fab } from 'mrcw';
const { Base as CustomeFab } = Fab;
const App = () => {
  return (
    <div>
      <CustomeFab arial-label="More Options">
        <Icon iconName="more_horiz" className="mdc-fab__icon" />
      </CustomeFab>
    </div>
  )
};
```

## Controlling Fab position
```css
.my-fab {
  position: fixed;
  left: 2rem;
  bottom: 2rem;
}
```
```javascript
import { Fab } from 'mrcw';
import css from './styles';

const App = () => {
  return (
    <div>
      <Fab iconName="more_horiz" className={css.my-fab} />
    </div>
  )
};
```

## Props
| Name     | Type                        | Default | Description                       |
| -------- | --------------------------- | ------- | --------------------------------- |
| absolute | PropTypes.bool              | true    | enable class `mrcw-fab--absolute` |
| exited   | PropTypes.bool              | false   | enable class `mdc-fab--exited`    |
| iconName | PropTypes.string.isRequired | -       | passing directly to Icon          |
| mini     | PropTypes.bool              | false   | enable class `mdc-fab--mini`      |
| ripple   | PropTypes.bool              | true    | enable `new MDCRipple(ref)`       |