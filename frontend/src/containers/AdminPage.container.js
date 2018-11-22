import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AdminPagePageActions from '../actions/admin-page';
import AdminPage from '../components/AdminPage';


function mapStateToProps(state) {
  return {
    ...state.adminPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AdminPagePageActions,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)