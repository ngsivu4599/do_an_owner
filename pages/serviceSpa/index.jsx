import { Link } from "@material-ui/core";
import React from "react";

const ServiceSpa = () => {
  return (
    <div className="menu-pt">
      <header className="header-pt">
        <nav className="site-nav">
          <ul>
            <li>
              <Link href="/serviceSpa/getAllService">Danh sách dịch vụ cơ sở làm đẹp</Link>
            </li>
            <li>
              <Link href="/serviceSpa/createService">Tạo lịch dịch vụ cho cơ sở</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default ServiceSpa;
