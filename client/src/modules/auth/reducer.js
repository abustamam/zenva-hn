import cookie from 'js-cookie'
import axios from 'axios'

const token = cookie.get('token')

axios.get(`/api/auth/${token}`)
     .then(res => console.log(res.data.user))
     .catch(err => console.log(err))

const initialState = {}

export default (state = initialState, action) => {
  return state
}
