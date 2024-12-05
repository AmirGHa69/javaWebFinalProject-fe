import React, { useState, useEffect } from "react";
import UpdateUserForm from "./UpdateUserForm";

const UserPage = ({ userId }) => {
    const [users, setUsers] = useState([]); // List of all users
    const [loggedInUser, setLoggedInUser] = useState(null); // Logged-in user details

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Fetch logged-in user details
    const fetchLoggedInUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`);
            const data = await response.json();
            setLoggedInUser(data);
        } catch (error) {
            console.error("Error fetching logged-in user:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchLoggedInUser();
    }, [userId]);

    const refreshUsers = () => {
        fetchUsers();
        fetchLoggedInUser();
    };

    return (
        <div>
            <h2>User Page</h2>
            {loggedInUser && (
                <div>
                    <h3>Edit Your Profile</h3>
                    <UpdateUserForm user={loggedInUser} onUpdateUser={refreshUsers} />
                </div>
            )}
            <h3>All Users</h3>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.userId}>
                            <strong>{user.userName}</strong> - {user.userEmail}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading users...</p>
            )}
        </div>
    );
};

export default UserPage;
