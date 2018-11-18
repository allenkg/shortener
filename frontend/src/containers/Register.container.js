import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RegisterPageActions from '../actions/registration-page';
import Register from '../components/Register';


function mapStateToProps(state) {
    return {
        ...state.registerPage,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            ...RegisterPageActions,
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)