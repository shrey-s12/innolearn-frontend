import { initialCreateInstructorFormData } from "@/config";
import { createInstructorService } from "@/services";
import { createContext, useState } from "react";

export const AdminContext = createContext(null);

export default function AdminProvider({ children }) {
    const [createInstructorFormData, setCreateInstructorFormData] = useState(
        initialCreateInstructorFormData
    );

    const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
    const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] = useState(0);
    const [loadingState, setLoadingState] = useState(false);


    async function handleCreateInstructor(event) {
        event.preventDefault();
        setLoadingState(true);
        const data = await createInstructorService(createInstructorFormData);
        setLoadingState(false);

        if (data?.success) {
            setCreateInstructorFormData(initialCreateInstructorFormData);
            setMediaUploadProgress(false);
            setMediaUploadProgressPercentage(0);
        }
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
                loadingState,
                setLoadingState,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}