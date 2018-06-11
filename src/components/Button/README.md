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
| Props name | Props type | Default props | Description                           |
| ---------- | ---------- | ------------- | ------------------------------------- |
| dense      | bool       | false         | enable class `mdc-button--dense`      |
| outlined   | bool       | false         | enable class `mdc-button--outlined`   |
| raised     | bool       | false         | enable class `mdc-button--raised`     |
| unelevated | bool       | false         | enable class `mdc-button--unelevated` |
| ripple     | bool       | true          | enable `new MDCRipple(ref)`           |