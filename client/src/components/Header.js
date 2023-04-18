// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import { Nav, NavItem } from "reactstrap";
// import { logout } from "../modules/authManager";
// import { NavLink as RRNavLink } from "react-router-dom";



// const Header = ({ isLoggedIn, userProfile }) => {
//   return (
//     <nav className="navbar navbar-expand navbar-dark bg-info">
//       <Link to="/" className="navbar-brand">
//         StreamISH
//       </Link>
//       <ul className="navbar-nav mr-auto">
//         <li className="nav-item">
//           <Link to="/" className="nav-link">
//             Feed
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/videos/add" className="nav-link">
//             New Video
//           </Link>
//         </li>
//         <Nav className="mr-auto" navbar>
//             {isLoggedIn && (
//               <>
//                 <NavItem>
//                   <NavLink tag={RRNavLink} to="/add">
//                     Add Quote
//                   </NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <a
//                     aria-current="page"
//                     className="nav-link"
//                     style={{ cursor: "pointer" }}
//                     onClick={logout}
//                   >
//                     Logout
//                   </a>
//                 </NavItem>
//               </>
//             )}
//             {!isLoggedIn && (
//               <>
//                 <NavItem>
//                   <NavLink tag={RRNavLink} to="/login">
//                     Login
//                   </NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink tag={RRNavLink} to="/register">
//                     Register
//                   </NavLink>
//                 </NavItem>
//               </>
//             )}
//           </Nav>
//       </ul>
//     </nav>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn, userProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          StreamISH
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/videos/add">
                    Add Video
                  </NavLink>
                </NavItem>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    Logout
                  </a>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav navbar>
            {userProfile && (
              <NavItem>
                <NavLink>Welcome, {userProfile.name}!</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
