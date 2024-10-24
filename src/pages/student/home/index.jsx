import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";


function StudentHomePage() {
    const { resetCredentials } = useContext(AuthContext);

    function handleLogout() {
        resetCredentials();
        sessionStorage.clear();
    }
    return (
        <div>
            <h1>Student Home Page</h1>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default StudentHomePage;