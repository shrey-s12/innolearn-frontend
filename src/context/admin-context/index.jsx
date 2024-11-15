import { initialCreateInstructorFormData } from "@/config";
import { createInstructorService } from "@/services";
import { createContext, useState } from "react";

export const AdminContext = createContext(null);

export default function AdminProvider({ children }) {
    const [createInstructorFormData, setCreateInstructorFormData] = useState(
        initialCreateInstructorFormData
    );

    const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
    const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
        useState(0);

    async function handleCreateInstructor(event) {
        event.preventDefault();
        const data = await createInstructorService(createInstructorFormData);
    }

    return (
        <AdminContext.Provider
            value={{
                createInstructorFormData,
                setCreateInstructorFormData,
                handleCreateInstructor,
                mediaUploadProgress,
                setMediaUploadProgress,
                mediaUploadProgressPercentage,
                setMediaUploadProgressPercentage,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}