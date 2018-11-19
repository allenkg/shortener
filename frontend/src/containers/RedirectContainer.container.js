import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MainPageActions from '../actions/main-page';
import RedirectContainer from '../components/RedirectContainer';


function mapStateToProps(state) {
  return {
    ...state.mainPage,
    ...state.authPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...MainPageActions,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedirectContainer)