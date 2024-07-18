// Auth.tsx
'use client';

import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../_store/authActions';
import store, { AppDispatch, RootState } from '../_store/store';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { setSuiBalance, setWallet } from '../_store/userSlice';
import { queryBonusCards } from '../_usecases/queryBonusCards';
import { querySuiBalance } from '../_sui/querySuiBalance';

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const partialZkLoginSignature = useSelector((state: RootState) => state.auth.partialZkLoginSignature);
  const userAddress = useSelector((state: RootState) => state.auth.userAddress);

  useEffect(() => {
    const init = async () => {
      const [bonusCards, suiBalance] = await Promise.all(
        [queryBonusCards(userAddress), querySuiBalance(userAddress)]
      );
      dispatch(setWallet(bonusCards))
      dispatch(setSuiBalance(suiBalance))
    };
    init();
  }, [userAddress])


  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (!hash) {
      return;
    }
    const params = new URLSearchParams(hash);
    const token = params.get('id_token');
    if (!token) {
      return;
    }

    dispatch(authenticateUser(token));
  }, [dispatch]);

  useEffect(() => {
    if (!partialZkLoginSignature) {
      return;
    }
    window.location.href = window.origin + '/member/wallet';
  }, [partialZkLoginSignature]);

  const preloadStore = () => {
    
  }
  

  return (
    <div className="flex h-screen flex-col justify-center items-center">
        <LoadingSpinner />
        <span className="text-xl">Einloggen...</span>
    </div>
  );
};

const WrappedAuth = () => <Provider store={store}><Auth></Auth></Provider>

export default WrappedAuth;