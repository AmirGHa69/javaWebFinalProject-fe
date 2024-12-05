import React, { useState } from "react";

const UpdateUserForm = ({ user, onUpdateUser }) => {
    const [userName, setUserName] = useState(user.userName);
    const [userEmail, setUserEmail] = useState(user.userEmail);
    const [userPassword, setUserPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/users/${user.userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName,
                    userEmail,
                    userPassword, // Include password in the payload
                }),
            });
            if (response.ok) {
                alert("User updated successfully!");
                onUpdateUser(); // Refresh or notify parent component
            } else {
                alert("Failed to update user.");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="userName">Name</label>
                <input
                    id="userName"
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="userEmail">Email</label>
                <input
                    id="userEmail"
                    type="email"
                    className="form-control"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="userPassword">Password (optional)</label>
                <input
                    id="userPassword"
                    type="password"
                    className="form-control"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Update User
            </button>
        </form>
    );
};

export default UpdateUserForm;
