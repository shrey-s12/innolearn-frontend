import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { BarChart, Book, LogOut, Settings, Sun, Moon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import InstructorDetailsPage from "./instructorDetailPage";
import { ThemeContext } from "@/context/theme-context";

function InstructorDashboardPage({ user }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const {
    instructorCoursesList,
    setInstructorCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(InstructorContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  async function fetchAllCourses() {
    setLoadingState(true);
    const response = await fetchInstructorCourseListService();
    if (response?.success) {
      setInstructorCoursesList(response?.data);
      setLoadingState(false);
    }
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard listOfCourses={instructorCoursesList} instructorId={user} />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} instructorId={user} />,
    },
    {
      icon: Settings,
      label: "Profile Settings",
      value: "profile-settings",
      component: <InstructorDetailsPage instructorId={user} />,
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

  return (
    <div className="flex h-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Instructor View</h2>
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
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h1 className="text-3xl font-bold mb-0 text-gray-900 dark:text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">

              <img
                src={user?.instructorImage}
                alt="Profile"
                className="w-9 h-9 rounded-full"
              />

              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-colors"
              >
                {theme === "light" ? (
                  <Moon className="text-yellow-500 w-5 h-5" />
                ) : (
                  <Sun className="text-orange-400 w-5 h-5" />
                )}
              </button>
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                Welcome, <span className="text-violet-700 dark:text-violet-400">{user?.instructorName}</span>
              </h2>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent key={menuItem.value} value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      {(loadingState) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default InstructorDashboardPage;
