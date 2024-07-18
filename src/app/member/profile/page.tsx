'use client';

// src/pages/profile.tsx
import { useEffect } from 'react';
import store, { AppDispatch, RootState } from '../../_store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSuiBalance, setWallet } from '@/app/_store/userSlice';
import { queryBonusCards } from '@/app/_usecases/queryBonusCards';
import { showErrorToast } from '../../../../components/ErrorToast';
import { querySuiBalance } from '@/app/_sui/querySuiBalance';

const Profile = () => {

  const dispatch: AppDispatch = useDispatch();
  let userAddress = useSelector((state: RootState) => state.auth.userAddress);  
  let suiBalance = useSelector((state: RootState) => state.user.suiBalance);

  useEffect(() => {
    const init = async () => {
        const suiBalance = await querySuiBalance(userAddress).catch(err => {
                showErrorToast('Es ist ein Fehler beim Laden des nativen Guthabens aufgetreten.');
                console.error(err);
        });
        dispatch(setSuiBalance(suiBalance ?? null));
    }
    init();
  });
  
  return (
    <div className="flex flex-col items-center bg-background p-4">
      <div className="w-full max-w-md bg-card rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-text mb-4">Account Settings</h2>
        <div className="mb-4">
          <label className="block text-textSecondary mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded border-border"
            placeholder="Max Mustermann"
            defaultValue=""
          />
          <div className="flex items-center mt-2">
            <input type="checkbox" className="form-checkbox text-button mr-2" />
            <span className="text-sm text-textSecondary">Share with participating shops</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-textSecondary mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded border-border"
            placeholder="john.doe@example.com"
            defaultValue="john.doe@example.com"
          />
          <div className="flex items-center mt-2">
            <input type="checkbox" className="form-checkbox text-button mr-2" />
            <span className="text-sm text-textSecondary">Share with participating shops</span>
          </div>
        </div>
        <p className="text-sm text-textSecondary mb-4">
          If you share your information with participating shops, you will automatically unlock all benefits for the shops.
        </p>
        <button className="w-full bg-button text-buttonText p-2 rounded hover:bg-buttonHover">
          Save Changes
        </button>
      </div>

      <div className="w-full max-w-md bg-card rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-text mb-4">About</h2>
        <div className="mb-4">
          <div className="flex flex-col justify-center mb-3">
            <span className="text-text break-all p-4 bg-gray-100 rounded-md" >{userAddress}</span>
          </div>
          <div className="flex flex-col justify-center mb-3">
            <span className="text-text text-sm break-all p-4 bg-gray-100 rounded-md">Balance: {suiBalance}</span>
          </div>
        </div>
      </div>

      {/* <div className="w-full max-w-sm bg-card rounded-lg shadow-md p-6">
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
            <span className="text-text break-all p-4 bg-gray-100 rounded-md" >{userAddress}</span>
          </div>
        </div>
      </div> */}

      {/* <div className="w-full max-w-md bg-card rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-text mb-4">Account Settings</h2>
        <div className="mb-4">
          <label className="block text-textSecondary mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded border-border"
            placeholder="Max Mustermann"
            defaultValue=""
          />
        </div>
        <div className="mb-4">
          <label className="block text-textSecondary mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded border-border"
            defaultValue="john.doe@example.com"
          />
        </div>
        <button className="w-full bg-button text-buttonText p-2 rounded hover:bg-buttonHover">
          Save Changes
        </button>
      </div>

      <div className="w-full max-w-md bg-card rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-text mb-4">Notification Preferences</h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-textSecondary">Email Notifications</span>
          <input type="checkbox" className="form-checkbox text-button" checked />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-textSecondary">SMS Notifications</span>
          <input type="checkbox" className="form-checkbox text-button" />
        </div>
        <button className="w-full bg-button text-buttonText p-2 rounded hover:bg-buttonHover">
          Save Preferences
        </button>
      </div>

      <div className="w-full max-w-md bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-text mb-4">App Settings</h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-textSecondary">Dark Mode</span>
          <input type="checkbox" className="form-checkbox text-button" />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-textSecondary">Enable Analytics</span>
          <input type="checkbox" className="form-checkbox text-button" checked />
        </div>
        <button className="w-full bg-button text-buttonText p-2 rounded hover:bg-buttonHover">
          Save Settings
        </button>
      </div> */}
    </div>
  );
};

export default Profile;
