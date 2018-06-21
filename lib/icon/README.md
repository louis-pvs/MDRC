# Icon component
<!-- TOC -->

- [Icon component](#icon-component)
  - [Basic usage](#basic-usage)
  - [Use with Button Component](#use-with-button-component)
  - [Props](#props)

<!-- /TOC -->
## Basic usage
```
import { Icon } from 'mrcw';

const App = () => {
  return (
    <div>
      Material Icon <Icon iconName='favourite'>
    </div>
  )
}
```
## Use with Button Component
Specific `className="mdc-button__icon"` when using Icon with Button
```
import { Button, Icon } from 'mrcw';

const App = () => {
  return (
    <div>
      <Button>
        <Icon className="mdc-button__icon" iconName='favourite'> Like
      </Button>
    </div>
  )
}
```

## Props
| Name     | Type                                      | Default | Description                                                             |
| -------- | ----------------------------------------- | ------- | ----------------------------------------------------------------------- |
| iconName | PropTypes.string.isRequired               | -       | to indicate [Material Icon](https://material.io/tools/icons)            |
| inactive | PropTypes.bool                            | false   | enable class `md-inactive`, only take effect when `props.mode` specific |
| mode     | PropTypes.oneOf(['dark', 'light'])        | null    | enable class `md-${props.mode}`                                         |
| size     | PropTypes.oneOf(['18', '24', '36', '48']) | null    | enable class `md-${props.size}`                                         |