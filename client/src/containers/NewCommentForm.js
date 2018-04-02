import { connect } from 'react-redux'

import NewCommentForm from '../components/NewCommentForm'
import { submitComment } from '../modules/comments/actions'

export default connect(s => ({}), { handleSubmit: submitComment })(NewCommentForm)
