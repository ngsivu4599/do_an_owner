import { Link } from "@material-ui/core";
import React from "react";

const CourseOnline = () => {
  return (
    <div className="menu-pt">
      <header className="header-pt">
        <nav className="site-nav">
          <ul>
            <li>
              <Link href="/courseOnline/getAllCourseOnline">
                Danh sách khóa học online
              </Link>
            </li>
            <li>
              <Link href="/courseOnline/createCourseOnline">
                Tạo khóa học online
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default CourseOnline;
