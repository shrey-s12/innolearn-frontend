import MediaProgressbar from "@/components/media-progress-bar";
import FormControls from "@/components/common-form/form-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createInstructorFormControls } from "@/config";
import { AdminContext } from "@/context/admin-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mediaUploadService } from "@/services";
import { useContext } from "react";

function CreateInstructor() {
    const { createInstructorFormData,
        setCreateInstructorFormData,
        handleCreateInstructor,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercentage,
        setMediaUploadProgressPercentage,
        loadingState
    } = useContext(AdminContext);

    async function handleImageUploadChange(event) {
        const selectedImage = event.target.files[0];

        if (selectedImage) {
            const imageFormData = new FormData();
            imageFormData.append("file", selectedImage);

            try {
                setMediaUploadProgress(true);
                const response = await mediaUploadService(
                    imageFormData,
                    setMediaUploadProgressPercentage
                );
                if (response.success) {
                    setCreateInstructorFormData({
                        ...createInstructorFormData,
                        instructorProfilePicture: response.data.url,
                    });
                    setMediaUploadProgress(false);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    function checkIfCreateInstructorFormIsValid() {
        return (
            createInstructorFormData &&
            createInstructorFormData.instructorName !== "" &&
            createInstructorFormData.instructorEmail !== "" &&
            createInstructorFormData.instructorPhone !== "" &&
            createInstructorFormData.instructorQualification !== "" &&
            createInstructorFormData.instructorExperience !== "" &&
            createInstructorFormData.instructorSpecialization.length > 0 &&
            createInstructorFormData.instructorUserName !== "" &&
            createInstructorFormData.instructorPassword !== "" &&
            createInstructorFormData.instructorBio !== ""
        );
    }

    return (
        <form onSubmit={handleCreateInstructor}>
            <Card className="bg-white dark:bg-gray-900 dark:text-gray-100 border dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between mb-0 pb-4">
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        Instructor Details
                    </CardTitle>
                    <Button
                        className="text-sm font-semibold px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                        type="submit"
                        disabled={!checkIfCreateInstructorFormIsValid() || loadingState}
                    >
                        {loadingState ? (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "Create Instructor"
                        )}
                    </Button>
                </CardHeader>

                <div className="p-4 pt-0">
                    {mediaUploadProgress ? (
                        <MediaProgressbar
                            isMediaUploading={mediaUploadProgress}
                            progress={mediaUploadProgressPercentage}
                        />
                    ) : null}
                </div>

                <CardContent>
                    {createInstructorFormData?.instructorProfilePicture ? (
                        <img
                            className="h-52 w-48 rounded border dark:border-gray-700 object-cover"
                            src={createInstructorFormData.instructorProfilePicture}
                            alt="Instructor"
                        />
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Label className="text-gray-700 dark:text-gray-300">Upload Image</Label>
                            <Input
                                onChange={handleImageUploadChange}
                                type="file"
                                accept="image/*"
                                className="mb-4 border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    )}

                    <FormControls
                        formControls={createInstructorFormControls}
                        formData={createInstructorFormData}
                        setFormData={setCreateInstructorFormData}
                    />
                </CardContent>
            </Card>
        </form>
    );
}

export default CreateInstructor;