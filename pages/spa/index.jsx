import React from "react";
import { Link } from "@material-ui/core";

const Spa = () => {
  return (
    <div className="menu-pt">
      <header className="header-pt">
        <nav className="site-nav">
          <ul>
            <li>
              <Link href="/spa/getAllSpa">Danh sách Cơ sở chăm sóc sức khỏe</Link>
            </li>
            <li>
              <Link href="/spa/createSpa">Tạo Cơ sở chăm sóc sức khỏe</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Spa;
