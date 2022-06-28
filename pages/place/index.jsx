import React from "react";
import { Link } from "@material-ui/core";

const Place = () => {
  return (
    <div className="menu-pt">
      <header className="header-pt">
        <nav className="site-nav">
          <ul>
            <li>
              <Link href="/place/getAllPlace">Danh sách địa điểm</Link>
            </li>
            <li>
              <Link href="/place/createPlace">Tạo địa điểm mới</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Place;
