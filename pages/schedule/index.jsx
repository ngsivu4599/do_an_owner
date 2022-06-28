import React from "react";
import { Link } from "@material-ui/core";

const Schedule = () => {
  return (
    <div className="menu-pt">
      <header className="header-pt">
        <nav className="site-nav">
          <ul>
            <li>
              <Link href="/schedule/getAllSchedule">Danh sách lịch hẹn</Link>
            </li>
            <li>
              <Link href="/schedule/createSchedule">Tạo lịch hẹn mới</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Schedule;
