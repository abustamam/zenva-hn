import React from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import glam, { Div } from 'glamorous'

import './App.css'
import Header from './containers/Header'
import Routes from './containers/Routes'

const AppBase = glam(Layout)({ minHeight: '100vh' })
const Content = glam(Layout.Content)({ padding: 50 })

const App = () => {
  return (
    <AppBase>
      <Header />
      <Content>
        <Div css={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Routes />
        </Div>
      </Content>
    </AppBase>
  )
}

export default App
