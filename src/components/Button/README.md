# Button component
<!-- TOC -->

- [Button component](#button-component)
  - [Basic usage](#basic-usage)
  - [Props](#props)

<!-- /TOC -->

## Basic usage
```
import { Button } from 'mrcw';

const App = () => {
  return (
    <div>
      Basic <Button>button</button>  
    </div>
  )
}
```

## Props
| Name       | Type           | Default | Description                           |
| ---------- | -------------- | ------- | ------------------------------------- |
| dense      | PropTypes.bool | false   | enable class `mdc-button--dense`      |
| outlined   | PropTypes.bool | false   | enable class `mdc-button--outlined`   |
| raised     | PropTypes.bool | false   | enable class `mdc-button--raised`     |
| unelevated | PropTypes.bool | false   | enable class `mdc-button--unelevated` |
| ripple     | PropTypes.bool | true    | enable `new MDCRipple(ref)`           |