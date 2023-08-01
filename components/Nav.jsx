"use client";
import { Navbar } from "flowbite-react";
import React from "react";

const Nav = () => {
  return (
    <div>
      <Navbar fluid={true} rounded={false}>
        <Navbar.Brand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Lography Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Lography.AI
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/" active={true}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/">About</Navbar.Link>
          <Navbar.Link href="/">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Nav;
