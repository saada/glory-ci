import styled from 'styled-components'

export const Header = styled.h1`
`

export const Layout = styled.div`
  font-family: sans-serif;
  font-size: 14px;
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  flex-direction: column;
`

export const HorizontalLayout = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: row;
`

export const VerticalLayout = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
`


export const Nav = styled.div`
  display: flex;
`

export const HorizontalNav = styled(Nav)`
  flex-direction: row;
`

export const VerticalNav = styled(Nav)`
  flex-direction: column;
`

export const NavItem = styled.div`
  flex: 1;
  text-align: center;
  border: solid;
`
