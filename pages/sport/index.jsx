import { Link } from '@material-ui/core';
import React from 'react';

const Sport = () => {
    return (
        <div className="menu-pt">
        <header className="header-pt">
          <nav className="site-nav">
            <ul>
              <li>
                <Link href="/sport/getAllSport">Danh sách dịch vụ thể thao giải trí</Link>
              </li>
              <li>
                <Link href="/sport/createSport">Tạo dịch vụ thể thao giải trí</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    )
};

export default Sport;