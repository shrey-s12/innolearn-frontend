import { GraduationCap, TvMinimalPlay, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { ThemeContext } from "@/context/theme-context";

function StudentViewCommonHeader({ user }) {
    const navigate = useNavigate();
    const { resetCredentials } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    function handleLogout() {
        resetCredentials();
        sessionStorage.clear();
    }

    console.log("user", user);

    return (
        <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-background dark:text-foreground sticky top-0 left-0 w-full z-50">
            <div className="flex items-center space-x-4">
                <Link to="/home" className="flex items-center hover:text-black dark:hover:text-white">
                    <GraduationCap className="h-8 w-8 mr-4" />
                    <span className="font-extrabold md:text-xl text-[14px]">
                        InnoLearn
                    </span>
                </Link>
                <div className="flex items-center space-x-1">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            location.pathname.includes("/courses")
                                ? null
                                : navigate("/courses");
                        }}
                        className="text-[14px] md:text-[16px] font-medium"
                    >
                        Explore Courses
                    </Button>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {/* Show hello username */}

                <div className="hidden md:flex items-center space-x-2">
                    <span className="text-[14px] md:text-[16px] font-medium">
                        Hello, {user?.userName}
                    </span>
                </div>
                <div
                    className="hidden md:flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate(`/student-profile/${user?._id}`)}
                >
                    <img
                        src={user?.userImage}
                        alt="Profile"
                        className="w-9 h-9 rounded-full"
                    />
                </div>

                <div className="flex gap-4 items-center">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center space-x-2 p-2 rounded-md bg-gray-200 dark:bg-gray-700"
                    >
                        {theme === "light" ? (
                            <Moon className="text-yellow-500 w-5 h-5" />
                        ) : (
                            <Sun className="text-orange-400 w-5 h-5" />
                        )}
                    </button>

                    <div
                        onClick={() => navigate("/student-courses")}
                        className="flex cursor-pointer items-center gap-3"
                    >
                        <span className="font-extrabold md:text-xl text-[14px]">
                            My Courses
                        </span>
                        <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
                    </div>


                    <Button onClick={handleLogout}>Sign Out</Button>
                </div>
            </div>
        </header >
    );
}

export default StudentViewCommonHeader;
