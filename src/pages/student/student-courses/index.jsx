import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchStudentBoughtCoursesService } from "@/services";
import { Watch } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentCoursesPage() {
    const { auth } = useContext(AuthContext);
    const {
        studentBoughtCoursesList,
        setStudentBoughtCoursesList,
        loadingState,
        setLoadingState,
    } = useContext(StudentContext);
    const navigate = useNavigate();

    async function fetchStudentBoughtCourses() {
        setLoadingState(true);
        const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
        if (response?.success) {
            setStudentBoughtCoursesList(response?.data);
            setLoadingState(false);
        }
    }
    useEffect(() => {
        fetchStudentBoughtCourses();
    }, []);

    return (
        <div className="p-4 dark:bg-gray-900 dark:text-white">
            <h1 className="text-3xl font-bold mb-8">My Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {loadingState ? (
                    <></>
                ) : studentBoughtCoursesList?.length > 0 ? (
                    studentBoughtCoursesList.map((course) => (
                        <Card key={course.id} className="flex flex-col dark:bg-gray-800 dark:border-gray-700">
                            <CardContent className="p-4 flex-grow">
                                <img
                                    src={course?.courseImage}
                                    alt={course?.title}
                                    className="h-52 w-full object-cover rounded-md mb-4"
                                />
                                <h3 className="font-bold mb-1 dark:text-white">{course?.title}</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                                    {course?.instructorName}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() =>
                                        navigate(`/course-progress/${course?.courseId}`, {
                                            state: { courseId: course?.courseId },
                                        })
                                    }
                                    className="flex-1 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                                >
                                    <Watch className="mr-2 h-4 w-4" />
                                    Start Watching
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <h1 className="text-3xl font-bold dark:text-white">No Courses found</h1>
                )}
            </div>

            {(loadingState) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}

export default StudentCoursesPage;
