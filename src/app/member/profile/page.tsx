'use client';

// src/pages/profile.tsx
import React from 'react';
import store, { AppDispatch, RootState } from '../../_store/store';
import { useSelector } from 'react-redux';

const Profile: React.FC = () => {
  const userAddress = useSelector((state: RootState) => state.auth.userAddress);
  
  return (
    <div className="flex flex-col items-center bg-background min-h-screen p-4">
      <div className="w-full max-w-sm bg-card rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full border-4 border-secundary mb-4"
            src="/mock/profile.jpg"
            alt="Profile Picture"
          />
          <h2 className="text-2xl font-bold text-text mb-2">John Doe</h2>
          <p className="text-textSecondary mb-4">A short bio about John Doe. He loves coding and building mobile apps.</p>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-3">
            <span className="text-textSecondary">Email:</span>
            <span className="text-text">john.doe@example.com</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-textSecondary">Location:</span>
            <span className="text-text">Berlin, Germany</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-textSecondary">Joined:</span>
            <span className="text-text">January 2020</span>
          </div>
          <div className="flex flex-col justify-center mb-3">
            <span className="text-textSecondary">Address:</span>
            <span className="text-text break-all p-4 bg-gray-100 rounded-md">{userAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
