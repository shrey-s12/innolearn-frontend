import AdminCourses from "@/components/admin-view/courses";
import AdminDashboard from "@/components/admin-view/dashboard";
import AdminTotalStudents from "@/components/admin-view/total-students";
import AdminTotalInstructors from "@/components/admin-view/total-instructors";
import AdminCreateInstructors from "@/components/admin-view/create-instructor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { BarChart, Book, LogOut, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";

function AdminDashboardpage({ user }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <AdminDashboard listOfCourses={instructorCoursesList} instructorId={user} />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <AdminCourses listOfCourses={instructorCoursesList} instructorId={user} />,
    },
    {
      icon: Users,
      label: "Students",
      value: "students",
      component: <AdminTotalStudents listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Users,
      label: "Instructors",
      value: "instructors",
      component: <AdminTotalInstructors listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Users,
      label: "Create Instructor",
      value: "create-instructor",
      component: <AdminCreateInstructors listOfCourses={instructorCoursesList} />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  console.log(instructorCoursesList, "instructorCoursesList");

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Admin View</h2>
          <nav>
            {menuItems.map((menuItem) => (
              <Button
                className="w-full justify-start mb-2"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                onClick={
                  menuItem.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(menuItem.value)
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <h2 className="text-3xl font-bold mb-8">Welcome, <span className="text-sky-700">{user?.userName}</span></h2>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboardpage;
