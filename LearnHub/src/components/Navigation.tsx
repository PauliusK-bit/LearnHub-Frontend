import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  HeroUIProvider,
} from "@heroui/react";

import "./Navigation.css";
import LogoutButton from "./LogoutButton";
import { useAuth } from "./AuthContext";
import { NavLink } from "react-router";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { user } = useAuth();

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <HeroUIProvider>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <NavLink color="foreground" to={"/"}>
              Home Page
            </NavLink>
          </NavbarItem>
          <NavbarItem isActive>
            <NavLink to={"/categories"}>Categories</NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink color="foreground" to={"/lecturers"}>
              Lecturers
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink color="foreground" to={"/admin-dashboard"}>
              Admin Dashboard
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink color="foreground" to={"/activities"}>
              Activities
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {location.pathname !== "/register" && (
            <NavbarItem className="hidden lg:flex">
              <Button as={Link} color="primary" href="/register" variant="flat">
                Register
              </Button>
            </NavbarItem>
          )}

          {!user ? (
            <>
              {" "}
              {location.pathname !== "/login" && (
                <NavbarItem className="hidden lg:flex">
                  <Link href="/login">Login</Link>
                </NavbarItem>
              )}
            </>
          ) : (
            <>
              <LogoutButton />
            </>
          )}
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </HeroUIProvider>
  );
};

export default Navigation;
