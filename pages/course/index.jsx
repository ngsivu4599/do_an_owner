import React from "react";
import { Link } from "@material-ui/core";

const Course = () => {
  return (
    <div className="menu-pt">
      <header className="header-pt">
        <nav className="site-nav">
          <ul>
            <li>
              <Link href="/course/allCourse">Danh Sách các khóa học</Link>
            </li>
            <li>
              <Link href="/course/createCourse">Tạo khóa học mới</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Course;
