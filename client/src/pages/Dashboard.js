import React from "react";
import { Button } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Admin(props) {
    const { handleAuthentication } = useAuth();

    return (
        <div>
            <div>Admin Page</div>

            ggffg
            <Button onClick={handleAuthentication}>Log out</Button>
        </div>
    );
}

export default Admin;