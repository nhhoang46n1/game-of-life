import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import "./style.css";
function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="justify-content-center">
        <NavbarBrand
          href="#home"
          className="header fs-2 fw-bold text-uppercase"
        >
          Game of Life
        </NavbarBrand>
      </Container>
    </Navbar>
  );
}

export default NavBar;
