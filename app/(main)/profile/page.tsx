import ProfilePage, { User } from '@/components/ProfilePage';
import React from 'react';

const Profile = () => {
  // Mock user data based on your JSON structure
  const mockUser: User = {
    _id: '681a048ec95d02acc4aeed08',
    email: 'Hadiirshaid8722@gmail.com',
    username: 'Elenaso',
    phoneNumber: '3444903319',
    role: 'student',
    __v: 0,
  };

  return <ProfilePage user={mockUser} />;
};

export default Profile;
