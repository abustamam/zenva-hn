import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { loginUser } from '../modules/auth/actions'

export default connect(s => ({ type: 'login' }), { handleSubmit: loginUser })(
  LoginForm
)
