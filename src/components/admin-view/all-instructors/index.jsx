import { InstructorContext } from "@/context/instructor-context";
import { fetchAllInstructorsService } from "@/services";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AllInstructors() {
  const { instructorsList, setInstructorsList } = useContext(InstructorContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllInstructors();
  }, []);

  async function fetchAllInstructors() {
    const response = await fetchAllInstructorsService();
    if (response?.success) setInstructorsList(response?.data);
  }

  return (
    <section className="px-4 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">All Instructors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {instructorsList && instructorsList.length > 0 ? (
          instructorsList.map((instructorItem) => (
            <div
              key={instructorItem?._id}
              onClick={() =>
                navigate(`/admin/instructors/get-instructor/details/${instructorItem?._id}`)
              }
              className="border rounded-lg overflow-hidden shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <img
                src={instructorItem?.instructorProfilePicture}
                width={300}
                height={150}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
                  {instructorItem?.instructorName}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {instructorItem?.instructorEmail}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-gray-800 dark:text-gray-200">No Instructors Found</h1>
        )}
      </div>
    </section>
  );
}

export default AllInstructors;
