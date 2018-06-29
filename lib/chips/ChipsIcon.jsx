import React, { PureComponent, Fragment } from 'react';
import { string, bool } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';
import { cssClasses, usedProps, enums } from './constants';
import notTruthyWith from '../utils/notTruthyWith';
import Icon from '../icon';

class ChipsIcon extends PureComponent {
  static propTypes = {
    [enums.LEAD]: function validate(...validates) {
      return notTruthyWith([enums.TRAIL], ...validates);
    },
    [enums.TRAIL]: function validate(...validates) {
      return notTruthyWith([enums.LEAD], ...validates);
    },
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
    const { checkmark, [enums.LEAD]: lead } = this.props;
    if (!checkmark || !lead) return null;
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
    const { [enums.LEAD]: lead, [enums.TRAIL]: trail, className } = this.props;
    const classNames = classnames(
      cssClasses.ICON,
      {
        [cssClasses.ICON_LEAD]: lead,
        [cssClasses.ICON_TRAIL]: trail,
      },
      className,
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
