import React, { Component } from 'react'
import { Button, Form, Icon, Input } from 'antd'

class NewPostForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, redirect, handleSubmit } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        handleSubmit(values, (err, res) => {
          if (err) {
            return console.error(err)
          }
          console.log(res.data.post)
          redirect(res.data.post._id)
        })
      }
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input title!' }],
          })(
            <Input
              prefix={<Icon type="tag-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Title"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('url', {})(
            <Input
              prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="URL"
            />,
          )}
        </Form.Item>
        <div>OR</div>
        <Form.Item>
          {getFieldDecorator('text', {})(
            <Input
              prefix={<Icon type="file-text" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Text"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(NewPostForm)