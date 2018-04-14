import React, { Component } from 'react'
import { Button, Form, Icon, Input } from 'antd'

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, type, redirect, handleSubmit } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const username = values[`${type}-username`]
        const password = values[`${type}-password`]
        handleSubmit({ username, password }, err => {
          if (err) {
            form.setFields({
              [`${type}-password`]: {
                value: password,
                errors: [new Error(err.response.data.message)]
              }
            })
            return
          }
          redirect()
        })
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

export default Form.create()(LoginForm)
