import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchInstructorDetailsService, updateInstructorService } from "@/services";

function InstructorDetailsPage({ instructorId }) {
    const { id } = useParams(); // Assuming the page uses a route like /instructors/:id
    const navigate = useNavigate(); // Hook to navigate back
    const [instructor, setInstructor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [formData, setFormData] = useState({}); // Form data for updates

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await fetchInstructorDetailsService(id || instructorId._id);
                setInstructor(data.data); // Adjust if API response differs
                setFormData(data.data); // Initialize form data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching instructor details:", error);
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id || instructorId._id]);

    const handleUpdate = async () => {
        try {
            const updatedData = await updateInstructorService(
                id || instructorId._id,
                formData
            );
            setInstructor(updatedData.data); // Update local state
            setShowModal(false); // Close the modal
        } catch (error) {
            console.error("Error updating instructor details:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!instructor) {
        return <div>No instructor details found.</div>;
    }

    return (
        <div className="container mx-auto py-6 px-20 text-gray-900 dark:text-gray-100">
            {/* Back Button */}
            {id && (
                <Button onClick={() => navigate(-1)} className="mb-4">
                    &larr; Back
                </Button>
            )}

            {/* Page Header */}
            <div className="my-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Instructor Details</h1>
                    <p className="text-gray-500 dark:text-gray-400">View and manage instructor details</p>
                </div>
                <Button onClick={() => setShowModal(true)}>Update Details</Button>
            </div>

            {/* Profile Card */}
            <Card className="mb-6 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    {/* Instructor Info */}
                    <div className="flex-1 md:mr-6">
                        <CardHeader>
                            <div>
                                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                    {instructor.instructorName}
                                </CardTitle>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    @{instructor.instructorUserName}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="mt-4">
                            <p>
                                <strong className="text-gray-700 dark:text-gray-300">Email:</strong>{" "}
                                <span className="text-gray-600 dark:text-gray-400">
                                    {instructor.instructorEmail}
                                </span>
                            </p>
                            <p>
                                <strong className="text-gray-700 dark:text-gray-300">Phone:</strong>{" "}
                                <span className="text-gray-600 dark:text-gray-400">
                                    {instructor.instructorPhone || "N/A"}
                                </span>
                            </p>
                            <p>
                                <strong className="text-gray-700 dark:text-gray-300">Specialization:</strong>{" "}
                                <span className="text-gray-600 dark:text-gray-400">
                                    {instructor.instructorSpecialization?.length > 0
                                        ? instructor.instructorSpecialization.join(", ")
                                        : "N/A"}
                                </span>
                            </p>
                            <p>
                                <strong className="text-gray-700 dark:text-gray-300">Address:</strong>{" "}
                                <span className="text-gray-600 dark:text-gray-400">
                                    {instructor.instructorAddress || "N/A"}
                                </span>
                            </p>
                        </CardContent>
                    </div>

                    {/* Profile Picture */}
                    <div className="w-44 h-48 my-auto mr-44 flex-shrink-0 relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-md bg-gray-50 dark:bg-gray-700">
                        <img
                            src={instructor.instructorProfilePicture}
                            alt={`${instructor.instructorName} Profile`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </Card>

            {/* Additional Details */}
            <Card className="mb-6 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
                <CardHeader>
                    <CardTitle className="text-xl">Additional Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Qualification:</strong> {instructor.instructorQualification || "N/A"}</p>
                    <p><strong>Experience:</strong> {instructor.instructorExperience || "N/A"}</p>
                    <p><strong>Bio:</strong> {instructor.instructorBio || "N/A"}</p>
                    {instructor.instructorLinkedinProfile && (
                        <p>
                            <strong>LinkedIn:</strong>{" "}
                            <a
                                href={instructor.instructorLinkedinProfile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                View Profile
                            </a>
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="courses" className="mt-6">
                <TabsList>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="statistics">Statistics</TabsTrigger>
                </TabsList>

                {/* Courses Tab */}
                <TabsContent value="courses">
                    <h3 className="text-lg font-semibold mb-4">Courses Taught</h3>
                    {instructor.courses?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {instructor.courses.map((course) => (
                                <Card key={course.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <CardHeader>
                                        <CardTitle>{course.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p><strong>Category:</strong> {course.category}</p>
                                        <p><strong>Duration:</strong> {course.duration} hours</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p>No courses available.</p>
                    )}
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews">
                    <h3 className="text-lg font-semibold mb-4">Reviews</h3>
                    {instructor.reviews?.length > 0 ? (
                        <ul>
                            {instructor.reviews.map((review, index) => (
                                <li key={index} className="mb-4">
                                    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                        <CardContent>
                                            <p><strong>{review.reviewerName}:</strong> {review.comment}</p>
                                            <p>Rating: {review.rating}/5</p>
                                        </CardContent>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </TabsContent>

                {/* Statistics Tab */}
                <TabsContent value="statistics">
                    <h3 className="text-lg font-semibold mb-4">Statistics</h3>
                    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <CardContent>
                            <p><strong>Total Courses:</strong> {instructor.totalCourses || 0}</p>
                            <p><strong>Total Students:</strong> {instructor.totalStudents || 0}</p>
                            <p><strong>Average Rating:</strong> {instructor.averageRating || "N/A"}</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Modal for Update */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Update Instructor Details</h2>
                        <form>
                            {[
                                { label: "Name", key: "instructorName" },
                                { label: "Phone", key: "instructorPhone" },
                                { label: "Address", key: "instructorAddress" },
                                { label: "Qualification", key: "instructorQualification" },
                                { label: "Experience", key: "instructorExperience" },
                            ].map(({ label, key }) => (
                                <label key={key} className="block mb-2">
                                    {label}:
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                                        value={formData[key] || ""}
                                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                    />
                                </label>
                            ))}
                            <label className="block mb-2">
                                Bio:
                                <textarea
                                    className="w-full p-2 border rounded mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                                    value={formData.instructorBio || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, instructorBio: e.target.value })
                                    }
                                />
                            </label>
                            <div className="flex justify-end mt-4">
                                <Button onClick={() => setShowModal(false)} className="mr-2">Cancel</Button>
                                <Button onClick={handleUpdate}>Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
}

export default InstructorDetailsPage;
