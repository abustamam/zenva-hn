import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Routes from '../components/Routes'

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isLoggedIn,
  }
}

export default compose(withRouter, connect(mapStateToProps))(Routes)