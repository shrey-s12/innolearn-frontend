import FormControls from "@/components/common-form/form-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createInstructorFormControls } from "@/config";
import { AdminContext } from "@/context/admin-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";

function CreateInstructor() {
    const { createInstructorFormData,
        setCreateInstructorFormData,
        handleCreateInstructor } = useContext(AdminContext);

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
            <Card>
                <CardHeader className="flex flex-row items-center justify-between mb-0 pb-4">
                    <CardTitle className="text-lg font-bold text-gray-800">Instructor Details</CardTitle>
                    <Button
                        className="text-sm font-semibold px-6 py-2 bg-black text-white rounded-md"
                        // formControls={createInstructorFormControls}
                        // formData={createInstructorFormData}
                        // setFormData={setCreateInstructorFormData}
                        type="submit"
                        disabled={!checkIfCreateInstructorFormIsValid()}
                    >
                        Create Instructor
                    </Button>
                </CardHeader>

                <CardContent>
                    <Label>Upload Image</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        className="mb-4"
                    />
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