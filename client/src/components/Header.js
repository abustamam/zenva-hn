import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import glam, { Div } from 'glamorous'

const HeaderBase = glam(Layout.Header)({
  display: 'flex',
  justifyContent: 'space-between',
  color: 'white'
})

const StyledLink = glam(Link)({ color: 'currentColor' })
const LinkWrapper = glam.div({ padding: '0px 10px' })

const HeaderLink = ({ to, children }) => (
  <LinkWrapper>
    <StyledLink to={to}>{children}</StyledLink>
  </LinkWrapper>
)

const Header = ({ isAuthenticated, logoutUser }) => (
  <HeaderBase>
    <Div css={{ display: 'flex' }}>
      <HeaderLink to="/">Home</HeaderLink>
      <HeaderLink to="/submit">Submit</HeaderLink>
    </Div>
    <Div>
      {isAuthenticated ? (
        <HeaderLink to="/login">
          <Div onClick={logoutUser}>Logout</Div>
        </HeaderLink>
      ) : (
        <HeaderLink to="/login">Login</HeaderLink>
      )}
    </Div>
  </HeaderBase>
)

export default Header
