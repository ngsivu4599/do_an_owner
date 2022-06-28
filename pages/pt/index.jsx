import React from "react";
import { Link } from "@material-ui/core";

const Pt = () => {
  return (
    <div className="menu-pt">
      <header className="header-pt">
        <nav className="site-nav">
          <ul>
            <li>
              <Link href="/pt/getallpt">Danh sách pt</Link>
            </li>
            <li>
              <Link href="/pt/creatept">Tạo pt mới</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Pt;
