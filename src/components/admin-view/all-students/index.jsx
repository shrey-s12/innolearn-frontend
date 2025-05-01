import { StudentContext } from "@/context/student-context";
import { fetchAllStudentsService } from "@/services";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TotalStudents() {
  const { studentsLists, setStudentsLists } = useContext(StudentContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllStudents();
  }, []);

  async function fetchAllStudents() {
    const response = await fetchAllStudentsService();
    if (response?.success) setStudentsLists(response?.data);
  }

  return (
    <section className="px-4 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">All Students</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentsLists && studentsLists.length > 0 ? (
          studentsLists.map((studentItem) => (
            <div
              key={studentItem?._id}
              onClick={() =>
                navigate(`/admin/students/get-student/details/${studentItem?._id}`)
              }
              className="border rounded-lg overflow-hidden shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <img
                src={studentItem?.userProfilePicture}
                width={300}
                height={150}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
                  {studentItem?.userFullName}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {studentItem?.userEmail}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-gray-800 dark:text-gray-200">No Students Found</h1>
        )}
      </div>
    </section>
  );
}

export default TotalStudents;
