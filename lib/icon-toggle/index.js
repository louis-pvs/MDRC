import React, { PureComponent } from 'react';
import { string, shape, bool, func } from 'prop-types';
import classnames from 'classnames';
import { MDCIconToggle } from '@material/icon-toggle';

import { Icon } from '../';
import './icon-toggle.scss';
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
    if (this.ref && this.props.onChange) {
      this.ref.removeEventListener('MDCIconToggle:change', this.notifyChange);
    }
  }

  getToggleData = dataToggle => JSON.stringify(dataToggle);

  init = (ref) => {
    if (ref && this.ref !== ref) {
      this.ref = ref;
      this.toggle = new MDCIconToggle(ref);
      if (this.props.onChange) {
        this.ref.addEventListener('MDCIconToggle:change', this.notifyChange);
      }
    }
  };

  notifyChange = ({ detail }) => {
    this.props.onChange(detail.isOn);
  };

  render() {
    const className = classnames(
      'mdc-icon-toggle',
      {
        'mdc-icon-toggle--disabled': this.props.disabled,
      },
      this.props.className,
    );
    return (
      <Icon
        aria-disabled={this.props.disabled}
        aria-label="Toggle"
        aria-pressed={this.props.isOn}
        className={className}
        data-toggle-off={this.state.dataToggleOff}
        data-toggle-on={this.state.dataToggleOn}
        getRef={this.init}
        iconName={this.props.iconName}
        role="button"
        tabIndex="0"
        {...omit(this.props, Object.keys(IconToggle.propTypes))}
      />
    );
  }
}

export default IconToggle;
