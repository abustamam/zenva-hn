import { connect } from 'react-redux'

import NewPostForm from '../components/NewPostForm'
import { submitPost } from '../modules/posts/actions'

export default connect(s => ({}), { handleSubmit: submitPost })(NewPostForm)