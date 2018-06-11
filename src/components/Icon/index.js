import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './icon.scss';
import omit from '../../utils/omit';

const Icon = props => (
  <i
    className={classnames(
      'material-icons',
      'mrcw-icon',
      {
        [`md-${props.size}`]: props.size,
        [`md-${props.mode}`]: props.mode,
        'md-inactive': props.inactive,
      },
      props.className,
    )}
    aria-hidden="true"
    {...omit(props, Object.keys(Icon.propTypes))}
  >
    {props.iconName}
  </i>
);

Icon.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  inactive: PropTypes.bool,
  mode: PropTypes.oneOf(['dark', 'light']),
  size: PropTypes.oneOfType([
    PropTypes.oneOf([18, 24, 36, 48]),
    PropTypes.oneOf(['18', '24', '36', '48']),
  ]),
};

Icon.defaultProps = {
  className: null,
  inactive: false,
  mode: null,
  size: null,
};

export default Icon;
