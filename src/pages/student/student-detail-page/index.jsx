import MediaProgressbar from "@/components/media-progress-bar";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchStudentDetailsService, updateStudentService, mediaUploadService } from "@/services";
import { AdminContext } from "@/context/admin-context";

function StudentDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});

    const {
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercentage,
        setMediaUploadProgressPercentage
    } = useContext(AdminContext);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await fetchStudentDetailsService(id);
                setStudent(data.data);
                setFormData(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching student details:", error);
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await updateStudentService(id, formData);
            const updatedDetails = await fetchStudentDetailsService(id);
            setStudent(updatedDetails.data);
            setShowModal(false);
        } catch (error) {
            console.error("Error updating student details:", error);
            alert("Failed to update student details. Please try again.");
        }
    };

    const HandleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileData = new FormData();
            fileData.append("file", file);

            try {
                setMediaUploadProgress(true);
                const response = await mediaUploadService(
                    fileData,
                    setMediaUploadProgressPercentage
                );

                if (response.success) {
                    // Correctly merge with existing state
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        userProfilePicture: response.data.url,
                    }));
                    setMediaUploadProgress(false);
                }
            } catch (e) {
                console.log(e);
                setMediaUploadProgress(false); // Stop progress on error
            }
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!student) {
        return <div>No student details found.</div>;
    }

    return (
        <div className="container mx-auto py-6 px-20">
            {/* Back Button */}
            {id && (
                <Button onClick={() => navigate(-1)} className="mb-4">
                    &larr; Back
                </Button>
            )}

            {/* Page Header */}
            <div className="my-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Student Details</h1>
                    <p className="text-gray-500 dark:text-gray-400">View and manage Student details</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Update Details
                </Button>
            </div>

            {/* Student Details */}
            <Card className="mb-6 shadow-lg border rounded-lg p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-start">
                    {/* Profile Picture */}
                    <div className="w-44 h-48 flex-shrink-0 relative overflow-hidden rounded-xl border border-gray-200 shadow-md bg-gray-50 mr-6 dark:bg-gray-700 dark:border-gray-600">
                        <img
                            src={student.userProfilePicture || "/placeholder.png"}
                            alt={`${student.userFullName}'s Profile`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-4">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                {student.userFullName}
                            </CardTitle>
                            <p className="text-sm text-gray-500 dark:text-gray-400">@{student.userName}</p>
                        </CardHeader>

                        <CardContent>
                            {/* Contact Details */}
                            <div className="space-y-2">
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">Email:</strong>{" "}
                                    <span className="text-gray-600 dark:text-gray-400">{student.userEmail}</span>
                                </p>
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">Phone:</strong>{" "}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {student.userPhoneNumber}
                                    </span>
                                </p>
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">Country:</strong>{" "}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {student.userAddress?.country}
                                    </span>
                                </p>
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">State:</strong>{" "}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {student.userAddress?.state}
                                    </span>
                                </p>
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">City:</strong>{" "}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {student.userAddress?.city}
                                    </span>
                                </p>
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">Street:</strong>{" "}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {student.userAddress?.street}
                                    </span>
                                </p>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-2">
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">Date of Birth:</strong>{" "}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {student.userDateOfBirth
                                            ? new Date(student.userDateOfBirth).toLocaleDateString("en-GB")
                                            : "N/A"}
                                    </span>
                                </p>

                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">Gender:</strong>{" "}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {student.userGender}
                                    </span>
                                </p>
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">Bio:</strong>{" "}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {student.userBio || "N/A"}
                                    </span>
                                </p>
                            </div>

                            {/* Online Presence */}
                            <div className="space-y-2">
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">LinkedIn:</strong>{" "}
                                    <a
                                        href={student.userLinkedinProfile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 underline"
                                    >
                                        {student.userLinkedinProfile || "N/A"}
                                    </a>
                                </p>
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">Website:</strong>{" "}
                                    <a
                                        href={student.userWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 underline"
                                    >
                                        {student.userWebsite || "N/A"}
                                    </a>
                                </p>
                            </div>

                            {/* Interests and Specialization */}
                            <div className="space-y-2">
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">Interests:</strong>{" "}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {student.userInterests?.join(", ")}
                                    </span>
                                </p>
                                <p>
                                    <strong className="text-gray-700 dark:text-gray-300">Specialization:</strong>{" "}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {student.userSpecialization?.join(", ") || "N/A"}
                                    </span>
                                </p>
                            </div>
                        </CardContent>
                    </div>
                </div>
            </Card>

            {/* Update Details Modal */}
            {showModal && (
                <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded shadow-lg">
                    {/* Progress Bar */}
                    <div className="p-4 pt-0">
                        {mediaUploadProgress ? (
                            <MediaProgressbar
                                isMediaUploading={mediaUploadProgress}
                                progress={mediaUploadProgressPercentage}
                            />
                        ) : null}
                    </div>

                    {/* Form Inputs */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Full Name:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userFullName || ""}
                            onChange={(e) => setFormData({ ...formData, userFullName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Phone Number:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userPhoneNumber || ""}
                            onChange={(e) => setFormData({ ...formData, userPhoneNumber: e.target.value })}
                        />
                    </div>

                    {/* Profile Picture */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Profile Picture:</label>
                        {formData.userProfilePicture ? (
                            <div>
                                <img
                                    src={formData.userProfilePicture}
                                    alt="Profile Picture"
                                    className="w-24 h-24 object-cover rounded-full"
                                />
                                <label className="block mt-2 text-gray-700 dark:text-gray-300 font-semibold">Change Profile Picture:</label>
                                <input
                                    type="file"
                                    className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={HandleFileUpload}
                                />
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="file"
                                    className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={HandleFileUpload}
                                />
                            </div>
                        )}
                    </div>

                    {/* Other Inputs */}
                    {/* Address, Date of Birth, Gender, etc. */}
                    {/* Similar changes as above: add `dark:bg-gray-700`, `dark:border-gray-600`, and `dark:text-gray-300` for inputs, and `dark:text-gray-300` for labels */}

                    {/* Address */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Country:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userAddress?.country || ""}
                            onChange={(e) => setFormData({ ...formData, userAddress: { ...formData.userAddress, country: e.target.value } })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">State:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userAddress?.state || ""}
                            onChange={(e) => setFormData({ ...formData, userAddress: { ...formData.userAddress, state: e.target.value } })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">City:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userAddress?.city || ""}
                            onChange={(e) => setFormData({ ...formData, userAddress: { ...formData.userAddress, city: e.target.value } })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Street:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userAddress?.street || ""}
                            onChange={(e) => setFormData({ ...formData, userAddress: { ...formData.userAddress, street: e.target.value } })}
                        />
                    </div>

                    {/* DOB */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Date of Birth:</label>
                        <input
                            type="date"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userDateOfBirth || ""}
                            onChange={(e) => setFormData({ ...formData, userDateOfBirth: e.target.value })}
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Gender:</label>
                        <select
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userGender || ""}
                            onChange={(e) => setFormData({ ...formData, userGender: e.target.value })}
                        >
                            <option value="">Select Gender </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Bio:</label>
                        <textarea
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userBio || ""}
                            onChange={(e) => setFormData({ ...formData, userBio: e.target.value })}
                        />
                    </div>

                    {/* LinkedIn Profile */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">LinkedIn Profile:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userLinkedinProfile || ""}
                            onChange={(e) => setFormData({ ...formData, userLinkedinProfile: e.target.value })}
                        />
                    </div>

                    {/* Website */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Website:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userWebsite || ""}
                            onChange={(e) => setFormData({ ...formData, userWebsite: e.target.value })}
                        />
                    </div>

                    {/* Interests */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Interests:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userInterests?.join(", ") || ""}
                            onChange={(e) => setFormData({ ...formData, userInterests: e.target.value.split(",") })}
                        />
                    </div>

                    {/* Specialization */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Specialization:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={formData.userSpecialization?.join(", ") || ""}
                            onChange={(e) => setFormData({ ...formData, userSpecialization: e.target.value.split(",") })}
                        />
                    </div>

                    {/* Buttons */}
                    <Button onClick={handleUpdate} className="mt-4 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                        Save Changes
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowModal(false);
                            setFormData({ ...student }); // Reset form data to the current student state
                        }}
                        className="mt-4 ml-2 bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    );
}

export default StudentDetailPage;
