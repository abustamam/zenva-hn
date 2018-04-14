import React from 'react'
import { Div } from 'glamorous'
import { Route, Switch, Redirect } from 'react-router-dom'

import PostList from '../containers/PostList'
import PostPage from '../containers/PostPage'
import Login from './LoginPage'
import NewPostPage from './NewPostPage'
import NotFoundPage from './NotFound'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
)

const Routes = ({ isAuthenticated }) => {
  return (
    <Div css={{ background: '#fff', padding: 24, minHeight: 280 }}>
      <Switch>
        <Redirect path="/" to="/posts" exact />
        <Route path="/posts" exact component={PostList} />
        <Route path="/login" component={Login} />
        <Route path="/posts/:postId" exact component={PostPage} />
        <Route path="/not-found" exact component={NotFoundPage} />
        <PrivateRoute
          path="/submit"
          isAuthenticated={isAuthenticated}
          component={NewPostPage}
        />
      </Switch>
    </Div>
  )
}

export default Routes
