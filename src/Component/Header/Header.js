import React from "react";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <Navbar className="navbar__style__wrapper">
        <Container>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
              <img
                style={{ height: "50px", width: "80px", marginTop: "-19px" }}
                src="https://i.postimg.cc/66fpHsZs/rc-Loy5-Lpi.gif"
                alt="logo"
              />
              <h3 className="subheading" style={{ color: "red" }}>
                StudentRegistrationForm
              </h3>
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              <Link
                className="mx-5"
                style={{ textDecoration: "none", color: "red" }}
                to={"/"}>
                Home
              </Link>
              <Link
                className="mx-3"
                style={{ textDecoration: "none", color: "red" }}
                to={"/details"}
                href="#features">
                Details
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
