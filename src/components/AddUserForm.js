import React, { useState } from 'react';

const AddUserForm = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, userEmail, userPassword }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('User created:', data);
                alert('User added successfully!');
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3 mb-3">
            <h3>Add User</h3>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Add User</button>
        </form>
    );
};

export default AddUserForm;
