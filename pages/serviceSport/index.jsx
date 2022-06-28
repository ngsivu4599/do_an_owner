import { Link } from '@material-ui/core';
import React from 'react';

const ServiceSport = () => {
    return (
        <div className="menu-pt">
        <header className="header-pt">
          <nav className="site-nav">
            <ul>
              <li>
                <Link href="/serviceSport/getAllServiceSport">Danh sách địa điểm thể thao giải trí</Link>
              </li>
              <li>
                <Link href="/serviceSport/createServiceSport">Tạo lịch dịch vụ cho thể thao giải trí</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
};

export default ServiceSport;