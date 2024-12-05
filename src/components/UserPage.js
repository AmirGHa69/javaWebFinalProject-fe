import React, { useEffect, useState } from 'react';

const UserPage = ({ userId }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users');
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('User deleted successfully!');
                    setUsers(users.filter((user) => user.id !== id));
                } else {
                    alert('Failed to delete user.');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleEditUser = async (id, newUsername) => {
        const updatedUser = { username: newUsername };
        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });
            if (response.ok) {
                alert('User updated successfully!');
                fetchUsers();
            } else {
                alert('Failed to update user.');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <div className="container">
            <h1>Users</h1>
            <ul className="list-group">
                {users.map((user) => (
                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{user.userName}</strong> ({user.userEmail})
                        </div>
                        {user.id === userId && (
                            <div>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => {
                                        const newUsername = prompt('Enter new username:', user.userName);
                                        if (newUsername) handleEditUser(user.id, newUsername);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPage;
