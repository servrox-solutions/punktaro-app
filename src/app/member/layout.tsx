'use client';
import Link from 'next/link';
// appdir/components/AppFrame.tsx
import React from 'react';
import Logo from '../../../components/Logo';
import { Provider } from 'react-redux';
import store, { persistor } from '../_store/store';
import { PersistGate } from 'redux-persist/integration/react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="flex flex-col h-screen bg-background max-h-full">      
          <header className="w-full fixed flex justify-between items-center p-4 bg-white shadow-md z-50">
            <div className="flex items-center">
              <Logo />
            </div>
            <div className="flex items-center bg-primary text-white rounded-full px-4 py-2 text-lg font-bold">
              <span>1345 Punkte</span>
            </div>
          </header>
          
          {/* Main content area */}
          <div className="flex-grow p-4 pb-16 pt-[90px]">
            <div className="py-4">
              {children}
            </div>
          </div>

          {/* Bottom Menu */}
          <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                  
                  <Link href="/member/wallet" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                      <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z"/>
                          <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z"/>
                      </svg>
                      <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500">Wallet</span>
                  </Link>
                  <Link href="/member/scanner" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:fill-bg-gray-50 dark:hover:fill-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500" height="100%" width="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487 487" fill="currentColor">
                      <g>
                        <g>
                          <path d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z
                            M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9
                            v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z
                            M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z
                            M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"/>
                        </g>
                      </g>
                    </svg>
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500">Scan</span>
                  </Link>

                    
                  <Link href="/member/coupon" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:fill-bg-gray-50 dark:hover:fill-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500" height="100%" width="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 310" fill="currentColor">
                        <path d="M309.987,118.749L302.24,12.383c-0.18-2.475-2.148-4.443-4.623-4.624L191.251,0.013c-1.461-0.106-2.873,0.424-3.899,1.451
                          L1.465,187.352c-1.953,1.953-1.953,5.119,0,7.071l114.112,114.112c0.976,0.976,2.256,1.464,3.535,1.464
                          c1.279,0,2.56-0.488,3.535-1.464l185.888-185.888C309.563,121.621,310.093,120.198,309.987,118.749z M189.136,136.38l-7.941,7.94
                          c3.446,5.183,5.917,10.785,7.047,16.04c0.199,0.923,0.023,1.888-0.489,2.681c-0.513,0.793-1.318,1.351-2.242,1.549l-13.225,2.846
                          c-0.923,0.198-1.887,0.022-2.681-0.49c-0.792-0.512-1.351-1.318-1.549-2.241c-0.94-4.369-4.233-10.055-8.007-13.83
                          c-3.921-3.921-11.627-9.477-15.654-5.449c-4.106,4.108-3.56,7.357,3.442,20.445c6.006,11.223,15.082,28.184,0.02,42.996
                          c-5.943,5.945-13.956,8.37-22.541,6.807c-3.749-0.683-7.507-2.117-11.201-4.271l-8.292,8.292c-1.39,1.39-3.645,1.39-5.035,0
                          l-9.566-9.566c-1.391-1.39-1.391-3.644,0-5.035l7.67-7.67c-5.672-8.046-8.854-17.896-8.604-26.929
                          c0.054-1.966,1.691-3.515,3.657-3.462l13.523,0.374c1.966,0.055,3.515,1.692,3.46,3.656c-0.16,5.809,2.963,13.103,7.596,17.751
                          c0.019,0.02,0.037,0.038,0.057,0.057c3.574,3.568,7.376,5.932,10.435,6.489c2.349,0.428,3.494-0.342,4.304-1.153
                          c3.234-3.18,3.134-5.849-3.685-18.594c-6.194-11.575-15.554-29.066,0.162-44.786c9.53-9.53,23.745-9.885,36.856-1.164l7.885-7.884
                          c0.668-0.668,1.573-1.043,2.518-1.043c0.944,0,1.85,0.376,2.517,1.043c0,0,0,0,0.001,0l9.565,9.566
                          C190.527,132.735,190.527,134.99,189.136,136.38z M236.96,95.109c-13.066,0-23.695-10.629-23.695-23.694
                          c0-13.065,10.63-23.695,23.695-23.695c13.065,0,23.695,10.63,23.695,23.695C260.656,84.479,250.026,95.109,236.96,95.109z"/>
                        </svg>

                      <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500">Angebote</span>
                  </Link>
                  <Link href="/member/profile" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                      <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                      </svg>
                      <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500">Profile</span>
                  </Link>
              </div>
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
