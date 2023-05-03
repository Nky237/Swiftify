import { NavLink, Outlet} from 'react-router-dom'
import styled from "styled-components";


const Nav = styled.nav`
  background-color: black;
  color: white;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 23%;
  padding-left: 40px;
  padding-top: 60px;

`
const NavLinkStyled = styled(NavLink)`
  color: white;
  height: 40px;
  display: flex;
  align-items: center;
  
  &.active {
    border-right: 3px solid white;
  }
`;
const Container = styled.div `
  display: flex;
`
const Main = styled.main `
  width: 75%;
  height: 100vh;
  overflow: auto;
  margin: auto;
`

const SideLayout = () => {
  return (
    <Container>
        <Nav>
            <NavLinkStyled to = '/' >Link Shortner</NavLinkStyled>
            <NavLinkStyled to = '/weather' >Weather</NavLinkStyled>
            <NavLinkStyled to = '/menu' >Our Menu</NavLinkStyled>
            <NavLinkStyled to = '/order' >Order</NavLinkStyled>
            <NavLinkStyled to = '/dash' >Dashboard</NavLinkStyled>
            <NavLinkStyled to = '/spot' >Spotify</NavLinkStyled>
        </Nav>  
        <Main>
            <Outlet />
        </Main>
    </Container>
  )
}

export default SideLayout