import React, { PureComponent, Fragment } from 'react';
import { string, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';
import notTruthyWith from '../utils/notTruthyWith';
import Icon from '../icon';

class ChipsIcon extends PureComponent {
  static propTypes = {
    [enums.LEAD]: (...validates) => notTruthyWith([enums.TRAIL], ...validates),
    [enums.TRAIL]: (...validates) => notTruthyWith([enums.LEAD], ...validates),
    checkmark: bool,
    className: string,
  };
  static defaultProps = {
    [enums.LEAD]: false,
    [enums.TRAIL]: false,
    checkmark: false,
    className: null,
  };

  renderChecker = () => {
    if (!this.props.checkmark || !this.props[enums.LEAD]) return null;
    return (
      <div className={cssClasses.CHECKMARK}>
        <svg className={cssClasses.SVG} viewBox="-2 -3 30 30">
          <path
            className={cssClasses.PATH}
            fill="none"
            stroke="black"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
          />
        </svg>
      </div>
    );
  };

  render() {
    const classNames = classnames(
      cssClasses.ICON,
      {
        [cssClasses.ICON_LEAD]: this.props[enums.LEAD],
        [cssClasses.ICON_TRAIL]: this.props[enums.TRAIL],
      },
      this.props.className,
    );
    return (
      <Fragment>
        <Icon className={classNames} {...omit(this.props, usedProps.ICON)} />
        {this.renderChecker()}
      </Fragment>
    );
  }
}

export default ChipsIcon;
