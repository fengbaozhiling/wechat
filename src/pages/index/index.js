import {
  bindActionCreators
} from 'redux';
import ImmutableComponent from "../immutable-page";
import creatorPage from '../create';
import connect from '../connect';

import * as userAction from '../../redux/user';

class Index extends ImmutableComponent {
  onLoad() {
    this.props.userLoad();
    console.log(this)
  }
}

connect(({
  user
}) => ({
  user
}),
(dispatch) => {
  return bindActionCreators({
    userLoad: userAction.userLoad
  }, dispatch)
}
)(Index);
Page(creatorPage(Index))

