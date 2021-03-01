

import { connect } from 'react-redux';
import { Redirect} from 'react-router';
import { createStructuredSelector} from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selector';
import { User } from '../../redux/user/types/user-types';

interface MyProps {
    user: User;
}
const AuthRoute = (props: MyProps) => {
   return (props.user && props.user.isAuthUser)? <Redirect to="/entity" />:<Redirect to="/"/>
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
});

export default connect(mapStateToProps)(AuthRoute);