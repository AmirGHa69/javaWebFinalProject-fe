import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import AddPostForm from '../components/AddPostForm';

const ProfilePage = () => {
    const { userId } = useParams();

    return (
        <div className="container">
            <h1>User Profile</h1>
            <UserProfile userId={userId} />
            <AddPostForm userId={userId} />
        </div>
    );
};

export default ProfilePage;
