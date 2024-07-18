'use client';

// Example usage in another component
import React, { useState } from 'react';
import QRScanner from '../../../../components/QRScanner';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/_store/store';
import { SuiClient } from '@mysten/sui/client';
import { SUI_API_ENDPOINT } from '@/app/_config/config';
import { isValidSuiAddress } from '@/app/_sui/isValidAddress';
import { showErrorToast } from '../../../../components/ErrorToast';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { bech32 } from 'bech32';

const App: React.FC = () => {
  let ephemeralPrivateKey = useSelector((state: RootState) => state.auth.ephemeralPrivateKey); 
  console.log(ephemeralPrivateKey)
  const res = bech32.decode(ephemeralPrivateKey);
  console.log(res.prefix)
  const secretKey = Uint8Array.from(bech32.fromWords(res.words));
   const restoredKeypair = Ed25519Keypair.fromSecretKey(secretKey);
  console.log(secretKey, restoredKeypair)
  const handleScan = async (result: string | null) => {
    if (!result) return;
    if (!isValidSuiAddress(result)) {
      showErrorToast("QR-Code nicht gültig");
      return;
    }
    const suiClient = new SuiClient({ url: SUI_API_ENDPOINT });
    const txb = new TransactionBlock();

    const packageId = '0xe03abc5d0b33d731b7db7b82d2e3109bcb94eee69d17392a786104c5c2c8f54e';
    const moduleName = 'bonuscard';
    const functionName = 'create';
    const args = [
      'Friseursalon Susanne',
      8,
      JSON.stringify(['bäckerei', 'nft']),
      result,
      '0x6'
    ];
    const gasBudget = 10000000;

    

    txb.moveCall({
      target: `${packageId}::${moduleName}::${functionName}`,
      arguments: args.map(arg => txb.pure(arg)),
    });

    txb.setGasBudget(gasBudget);
    // const { bytes, signature: userSignature } = await txb.sign({
    //   client: suiClient,
    //   signer: partialZkLoginSignature
    // });


    // suiClient.executeTransactionBlock({
    //   transactionBlock: bytes,
    //   signature: partialZkLoginSignature,
    // });
    // 0x9ffa4ef1ba97a03f0db8b9d567e595d9174403771df7ad96c6fdc1a9f62aabb3
    // serverAction(result);
  };
// const sponsorKeypair = Ed25519Keypair.generate();
    // console.log(sponsorKeypair.getSecretKey())
    // console.log(Ed25519Keypair.fromSecretKey('suiprivkey1qrleyw9a37783w4rf5g4u5qfplrrh024sxa2h4aa079397f2nseay3c8ae0'))
  return (
    <div className='h-full'>
      <div className="w-[100%] max-w-[500px] relative">
        <QRScanner onScan={handleScan} />
        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] h-[90%] aspect-square border-2 border-red"></div>
      </div>
      {/* {qrCodeContent && (
        <div>
          <h2>Scanned QR Code Content:</h2>
          <p>{qrCodeContent}</p>
        </div>
      )} */}
    </div>
  );
};

export default App;
