import { Outlet, useLocation } from "react-router-dom";
import StudentViewCommonHeader from "./header";
import ChatbotIcon from "./ChatbotIcon";

function StudentViewCommonLayout({ user }) {
  const location = useLocation();

  return (
    <div>
      {!location.pathname.includes("course-progress") ? (
        <StudentViewCommonHeader user={user} />
      ) : null}

      <Outlet />

      <ChatbotIcon />
    </div>
  );
}

export default StudentViewCommonLayout;
