import {
    initialCreateInstructorFormData,
} from "@/config";
import { createContext, useState } from "react";

export const AdminContext = createContext(null);

export default function AdminProvider({ children }) {
    const [createInstructorFormData, setCreateInstructorFormData] = useState(
        initialCreateInstructorFormData
    );

    return (
        <AdminContext.Provider
            value={{
                createInstructorFormData,
                setCreateInstructorFormData,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}