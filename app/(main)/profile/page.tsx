'use client';

import ProfilePage from '@/components/ProfilePage';
import { UserProfile } from '@/context/Auth';
import auth from '@/module/services/auth';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Profile = () => {
  const [userData, setUserData] = useState<UserProfile>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUserDate = async () => {
      try {
        setLoading(true);
        const data = await auth.getUserProfile();
        setUserData(data);
      } catch {
        toast.error('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserDate();
  }, []);

  if (loading)
    return (
      <LoaderCircle className="text=primary animate-spin h-10 w-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );

  return <ProfilePage user={userData!} />;
};

export default Profile;
