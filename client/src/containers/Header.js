import { connect } from 'react-redux'
import Header from '../components/Header'
import { logoutUser } from '../modules/auth/actions'

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps, { logoutUser })(Header)
