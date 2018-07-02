import React, { PureComponent } from 'react';
import {
  string, shape, bool, func,
} from 'prop-types';
import classnames from 'classnames';
import { MDCIconToggle } from '@material/icon-toggle';

import Icon from '../icon';
import './icon-toggle.scss';
import { cssClasses, usedProps, event } from './constants';
import omit from '../utils/omit';

class IconToggle extends PureComponent {
  static propTypes = {
    className: string,
    dataToggleOff: shape({
      label: string,
      content: string,
      cssClass: string,
    }),
    dataToggleOn: shape({
      label: string,
      content: string,
      cssClass: string,
    }),
    disabled: bool,
    iconName: string.isRequired,
    isOn: bool,
    onChange: func,
  };

  static defaultProps = {
    className: null,
    dataToggleOff: {},
    dataToggleOn: {},
    disabled: false,
    isOn: true,
    onChange: null,
  };

  constructor(props) {
    super(props);
    this.toggle = null;
    this.ref = null;
    this.state = {
      dataToggleOn: this.getToggleData(props.dataToggleOn),
      dataToggleOff: this.getToggleData(props.dataToggleOff),
    };
  }

  componentWillUnmount() {
    const { onChange } = this.props;
    if (this.ref && onChange) {
      this.ref.removeEventListener(event.CHANGE, this.notifyChange);
    }
  }

  getToggleData = dataToggle => JSON.stringify(dataToggle);

  init = (ref) => {
    const { onChange } = this.props;
    if (ref && this.ref !== ref) {
      this.ref = ref;
      this.toggle = new MDCIconToggle(ref);
      if (onChange) {
        this.ref.addEventListener(event.CHANGE, this.notifyChange);
      }
    }
  };

  notifyChange = ({ detail }) => {
    const { onChange } = this.props;
    onChange(detail.isOn);
  };

  render() {
    const {
      disabled, className, isOn, iconName,
    } = this.props;
    const { dataToggleOff, dataToggleOn } = this.state;
    const classNames = classnames(
      cssClasses.ROOT,
      {
        [cssClasses.DISABLED]: disabled,
      },
      className,
    );
    return (
      <Icon
        aria-disabled={disabled}
        aria-label="Toggle"
        aria-pressed={isOn}
        className={classNames}
        data-toggle-off={dataToggleOff}
        data-toggle-on={dataToggleOn}
        getRef={this.init}
        iconName={iconName}
        role="button"
        tabIndex="0"
        {...omit(this.props, usedProps.INDEX)}
      />
    );
  }
}

export default IconToggle;
