import { Outlet, useLocation } from "react-router-dom";
// import StudentViewCommonHeader from "./header";

function StudentViewCommonLayout() {
    //   const location = useLocation();
    return (
        <div>
            {/* {!location.pathname.includes("course-progress") ? (
        <StudentViewCommonHeader />
      ) : null} */}
            common content

            <Outlet />
        </div>
    );
}

export default StudentViewCommonLayout;
