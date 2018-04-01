import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Button, Layout, Menu, Form, Icon, Input } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import cookie from 'js-cookie'

import './App.css'

const { Header, Content, Footer } = Layout

const Home = () => <div>Home</div>

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, type, redirect } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const url =
          type === 'login' ? '/api/auth/login' : '/api/auth/create-admin'
        const username = values[`${type}-username`]
        const password = values[`${type}-password`]
        axios
          .post(url, { username, password })
          .then(res => {
            console.log('auth success', res.data)
            cookie.set('token', res.data.token, { expires: 7 })
            redirect()
          })
          .catch(err => console.log(err))
      }
    })
  }

  render() {
    const { type, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator(`${type}-username`, {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator(`${type}-password`, {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {type === 'login' ? 'Login' : 'Sign up'}
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedLoginForm = Form.create()(LoginForm)

class Login extends Component {
  redirectToHome = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <WrappedLoginForm type="login" redirect={this.redirectToHome} />
        <h3>Sign Up</h3>
        <WrappedLoginForm type="signup" redirect={this.redirectToHome} />
      </div>
    )
  }
}

class App extends Component {
  componentDidMount() {
    axios
      .get('/api/posts/')
      .then(res => console.log({ res }))
      .catch(e => console.log(e))
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'white'
          }}
        >
          <div>
            <Link style={{ color: 'currentColor' }} to="/">
              Home
            </Link>
          </div>
          <div>
            <Link style={{ color: 'currentColor' }} to="/signin">
              Log in
            </Link>
          </div>
        </Header>
        <Content style={{ padding: 50 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signin" component={Login} />
            </Switch>
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    )
  }
}

export default App
