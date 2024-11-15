import { initialCreateInstructorFormData } from "@/config";
import { createInstructorService } from "@/services";
import { createContext, useState } from "react";

export const AdminContext = createContext(null);

export default function AdminProvider({ children }) {
    const [createInstructorFormData, setCreateInstructorFormData] = useState(
        initialCreateInstructorFormData
    );
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
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}