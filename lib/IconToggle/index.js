import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MDCIconToggle } from '@material/icon-toggle';

import { Icon } from '../';
import './iconToggle.scss';
import omit from '../utils/omit';

class IconToggle extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = null;
    this.el = null;
    this.state = {
      dataToggleOn: this.getToggleData(props.dataToggleOn),
      dataToggleOff: this.getToggleData(props.dataToggleOff),
    };
  }
  componentWillUnmount() {
    if (this.el && this.props.onChange) {
      this.el.removeEventListener('MDCIconToggle:change', this.notifyChange);
    }
  }
  getToggleData = dataToggle => JSON.stringify(dataToggle);
  init = (ref) => {
    if (ref) {
      this.ref = new MDCIconToggle(ref);
      if (this.props.onChange) {
        this.el = ref;
        this.el.addEventListener('MDCIconToggle:change', this.notifyChange);
      }
    }
  };
  notifyChange = ({ detail }) => {
    this.props.onChange(detail.isOn);
  };
  render() {
    const className = classnames(
      {
        'mdc-icon-toggle': true,
        'mdc-icon-toggle--disabled': this.props.disabled,
      },
      this.props.className,
    );
    return (
      <Icon
        aria-disabled={this.props.disabled}
        aria-label=""
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

IconToggle.propTypes = {
  className: PropTypes.string,
  dataToggleOff: PropTypes.shape({
    label: PropTypes.string,
    content: PropTypes.string,
    cssClass: PropTypes.string,
  }),
  dataToggleOn: PropTypes.shape({
    label: PropTypes.string,
    content: PropTypes.string,
    cssClass: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  iconName: PropTypes.string.isRequired,
  isOn: PropTypes.bool,
  onChange: PropTypes.func,
};

IconToggle.defaultProps = {
  className: null,
  dataToggleOff: {},
  dataToggleOn: {},
  disabled: false,
  isOn: true,
  onChange: null,
};

export default IconToggle;
