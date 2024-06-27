// src/pages/settings.tsx
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-background min-h-screen p-4">
      <div className="w-full max-w-md bg-card rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-text mb-4">Account Settings</h2>
        <div className="mb-4">
          <label className="block text-textSecondary mb-1">Username</label>
          <input
            type="text"
            className="w-full p-2 border rounded border-border"
            defaultValue="JohnDoe"
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
      </div>
    </div>
  );
};

export default Settings;
