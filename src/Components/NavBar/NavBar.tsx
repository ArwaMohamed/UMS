import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import style from "./NavBar.module.css";

export default function NavBar() {
  return (
   <>
     <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
          <h1 className={`${style.loginHeader} m-0`}>UMS</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
   </>
  )
}
