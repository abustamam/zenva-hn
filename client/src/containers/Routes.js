import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Routes from '../components/Routes'

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.user,
  }
}

export default withRouter(connect(mapStateToProps)(Routes))