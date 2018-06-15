import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import BaseFab from './BaseFab';
import { Icon } from '../';

import omit from '../utils/omit';

class Fab extends PureComponent {
  static propTypes = {
    iconName: string.isRequired,
  };

  static Base = props => <BaseFab {...omit(props, Object.keys(Fab.propTypes))} />;

  render() {
    return (
      <BaseFab {...omit(this.props, Object.keys(Fab.propTypes))}>
        <Icon className="mdc-fab__icon" iconName={this.props.iconName} />
      </BaseFab>
    );
  }
}

export default Fab;
