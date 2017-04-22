import React, {Component} from 'react'
import styled from 'styled-components'
import {
  Header,
  Layout,
  HorizontalLayout,
  VerticalLayout,
  VerticalNav,
  NavItem
} from './Ui'

const Ui = styled(Layout)`
`

const Page = styled(VerticalLayout)`
`

const SideMenu = styled(HorizontalLayout)`
`

const Toolbar = styled.div`
  flex: 1;
  border: solid;
`

const Content = styled.div`
  display: flex;
  flex: 10;
  border: solid;
`

const Footer = styled.div`
  flex: 1;
  border: solid;
`

class App extends Component {
  render () {
    return <Ui>
      <SideMenu>
        <VerticalNav>
          <NavItem>{'Item'}</NavItem>
          <NavItem>{'Item'}</NavItem>
          <NavItem>{'Item'}</NavItem>
          <NavItem>{'Item'}</NavItem>
          <NavItem>{'Item'}</NavItem>
          <NavItem>{'Item'}</NavItem>
          <NavItem>{'Item'}</NavItem>
        </VerticalNav>
        <Page>
          <Toolbar>
            <Header>{'Glory CI'}</Header>
          </Toolbar>
          <Content>
            {'Content'}
          </Content>
          <Footer>{'Footer'}</Footer>
        </Page>
      </SideMenu>
    </Ui>
  }
}

export default App
