import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import LoginPageActions from '../actions/auth-page';
import Login from '../components/Login';


function mapStateToProps(state) {
  return state.authPage
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            ...LoginPageActions,
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)