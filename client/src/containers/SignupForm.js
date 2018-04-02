import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { signupUser } from '../modules/auth/actions'

export default connect(s => ({ type: 'signup' }), { handleSubmit: signupUser })(LoginForm)