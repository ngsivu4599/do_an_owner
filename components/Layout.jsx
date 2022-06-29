import React from "react";
import { Link } from "@material-ui/core";
import withAuth from "../pages/HOC/withAuth";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Layout(props) {
  const Router = useRouter();
  const logout = () => {
    Cookies.remove("token");
    Router.replace("/login");
  };

  const handleRouterLink = (router) => () => {
    Router?.replace(`/${router}`);
  };

  return (
    <div>
      <div id="app" className="nav-drawer-is-open">
        <div className="sidenav">
          <div className="sidenav-col sidenav-col-primary">
            <ol className="nav-list">
              <li className="nav-list-item nav-list-item-header"></li>
              <li className="nav-list-item">
                <span
                  className={
                    Router.pathname.includes("create-apartment")
                      ? "nav-list-item-link is-selected"
                      : "nav-list-item-link"
                  }
                  onClick={handleRouterLink("create-apartment")}
                >
                  Thêm phòng trọ
                </span>
              </li>

              <li className="nav-list-item">
                <span
                  className={
                    Router.pathname.includes("userandcoin")
                      ? "nav-list-item-link is-selected"
                      : "nav-list-item-link"
                  }
                  onClick={handleRouterLink("userandcoin")}
                >
                  Quản lý user và coin
                </span>
              </li>
              <li className="nav-list-item">
                <span
                  className={
                    Router.pathname.includes("place")
                      ? "nav-list-item-link is-selected"
                      : "nav-list-item-link"
                  }
                  onClick={handleRouterLink("listApartment")}
                  id="nav-item-orders"
                >
                  Danh sách phòng trọ
                </span>
              </li>
              <li className="nav-list-item">
                <span
                  className={
                    Router.pathname.includes("serviceSpa")
                      ? "nav-list-item-link is-selected"
                      : "nav-list-item-link"
                  }
                  // onClick={handleRouterLink("serviceSpa")}
                  id="nav-item-orders"
                >
                  Dịch vụ
                </span>
              </li>
            </ol>
          </div>
        </div>

        <div className="header-row">
          <header className="layout-header">
            <div className="layout-header-right">
              <DropdownButton
                id="dropdown-button-dark-example2"
                variant="secondary"
                // menuVariant="dark"
                title="Admin"
                className="mt-2"
              >
                <Dropdown.Item href="/profiles" className="admin-header-menu">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={logout} className="admin-header-menu">
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </header>
        </div>

        <main id="content" role="main">
          {props.children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
