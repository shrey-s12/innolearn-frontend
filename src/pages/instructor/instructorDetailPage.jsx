import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchInstructorDetailsService, updateInstructorService } from "@/services";

function InstructorDetailsPage({ instructorId }) {
    const { id: routeId } = useParams();
    const navigate = useNavigate();
    const instructorKey = routeId || instructorId?._id;

    const [instructor, setInstructor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});

    const fetchInstructorDetails = async () => {
        setLoading(true);
        try {
            const res = await fetchInstructorDetailsService(instructorKey);
            setInstructor(res.data);
            setFormData(res.data);
        } catch (err) {
            console.error("Failed to fetch instructor:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (instructorKey) fetchInstructorDetails();
    }, [instructorKey]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await updateInstructorService(instructorKey, formData);
            const data = await fetchInstructorDetailsService(instructorKey);
            setInstructor(data.data);           // update state
            setFormData(data.data);             // sync form
            setShowModal(false);                // close modal
        } catch (error) {
            console.error("Error updating instructor:", error);
        } finally {
            setUpdating(false);
        }
    };

    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!instructor) {
        return <div className="text-center mt-10 text-gray-500">No instructor details found.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
            {routeId && (
                <Button onClick={() => navigate(-1)} className="mb-4">&larr; Back</Button>
            )}

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Instructor Details</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">View and manage instructor details</p>
                </div>
                <Button onClick={() => setShowModal(true)}>Edit Details</Button>
            </div>

            {/* Profile Card */}
            <Card className="mb-6">
                <div className="flex flex-col md:flex-row p-4">
                    <div className="flex-1 md:mr-6">
                        <CardHeader>
                            <CardTitle className="text-2xl">{instructor.instructorName}</CardTitle>
                            <p className="text-sm text-gray-500">@{instructor.instructorUserName}</p>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p><strong>Email:</strong> {instructor.instructorEmail}</p>
                            <p><strong>Phone:</strong> {instructor.instructorPhone || "N/A"}</p>
                            <p><strong>Specialization:</strong> {instructor.instructorSpecialization?.join(", ") || "N/A"}</p>
                            <p><strong>Address:</strong> {instructor.instructorAddress || "N/A"}</p>
                        </CardContent>
                    </div>
                    <div className="w-40 h-44 overflow-hidden rounded-lg border bg-gray-100 dark:bg-gray-700">
                        <img
                            src={instructor.instructorProfilePicture}
                            alt="Instructor"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </Card>

            {/* Additional Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Qualification:</strong> {instructor.instructorQualification || "N/A"}</p>
                    <p><strong>Experience:</strong> {instructor.instructorExperience || "N/A"}</p>
                    <p><strong>Bio:</strong> {instructor.instructorBio || "N/A"}</p>
                    {instructor.instructorLinkedinProfile && (
                        <p><strong>LinkedIn:</strong> <a href={instructor.instructorLinkedinProfile} className="text-blue-500 underline" target="_blank" rel="noreferrer">View</a></p>
                    )}
                </CardContent>
            </Card>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Update Instructor</h2>
                        <form onSubmit={handleUpdate} className="space-y-3">
                            {[
                                { label: "Name", key: "instructorName" },
                                { label: "Phone", key: "instructorPhone" },
                                { label: "Address", key: "instructorAddress" },
                                { label: "Qualification", key: "instructorQualification" },
                                { label: "Experience", key: "instructorExperience" },
                            ].map(({ label, key }) => (
                                <div key={key}>
                                    <label className="block text-sm">{label}</label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 p-2 rounded border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        value={formData[key] || ""}
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm">Bio</label>
                                <textarea
                                    className="w-full mt-1 p-2 rounded border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    value={formData.instructorBio || ""}
                                    onChange={(e) => handleInputChange("instructorBio", e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" onClick={() => { setShowModal(false); setFormData(instructor); }} disabled={updating}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={updating}>
                                    {updating ? (
                                        <span className="flex items-center">
                                            <span className="loader mr-2 w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                                            Saving...
                                        </span>
                                    ) : (
                                        "Save"
                                    )}
                                </Button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InstructorDetailsPage;
